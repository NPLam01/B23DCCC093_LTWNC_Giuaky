import React, { memo } from 'react';
import { BookOpen, Check, RotateCcw } from 'lucide-react';
import { Book } from '../../types';

export interface BookCardProps {
  book: Book;
  isBorrowed?: boolean;
  onBorrow: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
}

/**
 * Component hiển thị thẻ sách theo phong cách Turing.com:
 * - Nền thẻ sang trọng, viền tinh tế
 * - Badge [Category] gọn gàng, không có icon sao
 * - Pill [Copies] nổi bật ở góc phải
 * - Tiêu đề lớn sắc nét
 * - Mô tả ngắn 2 dòng
 * - Nút tương tác Mượn / Trả hiện đại
 */
export const BookCard: React.FC<BookCardProps> = memo(
  ({ book, isBorrowed = false, onBorrow, onReturn }) => {
    const isOutOfStock = book.availableCopies <= 0;

    const handleBorrowClick = () => {
      if (!isOutOfStock && !isBorrowed) {
        onBorrow(book.id);
      }
    };

    const handleReturnClick = () => {
      if (onReturn && isBorrowed) {
        onReturn(book.id);
      }
    };

    const descriptionText =
      book.description ||
      `Tài liệu chuyên khảo chuyên ngành ${book.category}, cung cấp kiến thức nền tảng và nghiên cứu chuyên sâu.`;

    return (
      <article className="turing-card" data-testid={`book-card-${book.id}`}>
        {/* Header: Left Category Badge (không có sao) & Right Copies Pill */}
        <div className="turing-card-header">
          <div className="turing-category-badge">
            <span>{book.category}</span>
          </div>

          <div
            className={`turing-reward-pill ${
              isOutOfStock ? 'pill-out' : isBorrowed ? 'pill-borrowed' : 'pill-available'
            }`}
          >
            <BookOpen size={13} />
            <span data-testid={`copies-${book.id}`}>
              {isOutOfStock ? 'Hết sách' : `${book.availableCopies} cuốn`}
            </span>
          </div>
        </div>

        {/* Body: Title, Author, Year, Description */}
        <div className="turing-card-body">
          <h3 className="turing-card-title" title={book.title}>
            {book.title}
          </h3>

          <div className="turing-card-meta">
            <span className="turing-author">{book.author}</span>
            <span className="turing-meta-dot">·</span>
            <span className="turing-year">{book.publishedYear}</span>
          </div>

          <p className="turing-card-desc">{descriptionText}</p>
        </div>

        {/* Footer: Action button */}
        <div className="turing-card-footer">
          {isBorrowed ? (
            <div className="turing-action-group">
              <button
                type="button"
                className="turing-btn turing-btn-borrowed"
                disabled
                title="Bạn đang mượn cuốn sách này"
                aria-label="Đang mượn"
              >
                <Check size={14} />
                <span>Đang mượn</span>
              </button>
              {onReturn && (
                <button
                  type="button"
                  className="turing-btn turing-btn-secondary"
                  onClick={handleReturnClick}
                  title="Trả sách này"
                  aria-label={`Trả sách ${book.title}`}
                >
                  <RotateCcw size={14} />
                  <span>Trả</span>
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="turing-btn turing-btn-primary"
              onClick={handleBorrowClick}
              disabled={isOutOfStock}
              aria-label={`Mượn sách ${book.title}`}
              data-testid={`borrow-btn-${book.id}`}
            >
              <span>{isOutOfStock ? 'Hết bản' : 'Mượn sách'}</span>
            </button>
          )}
        </div>
      </article>
    );
  }
);

BookCard.displayName = 'BookCard';
