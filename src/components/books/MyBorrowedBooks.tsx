import React, { useCallback } from 'react';
import { BookmarkCheck, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectBorrowedBooksList, selectBorrowedBookIds } from '../../features/books/booksSelectors';
import { returnBook } from '../../features/books/booksSlice';
import { MAX_BORROW_LIMIT } from '../../features/borrowing/borrowing.utils';

export const MyBorrowedBooks: React.FC = () => {
  const dispatch = useAppDispatch();
  const borrowedBooks = useAppSelector(selectBorrowedBooksList);
  const borrowedIds = useAppSelector(selectBorrowedBookIds);

  const handleReturn = useCallback(
    (bookId: string) => {
      dispatch(returnBook(bookId));
    },
    [dispatch]
  );

  const isFull = borrowedIds.length >= MAX_BORROW_LIMIT;

  return (
    <section className="turing-sidebar-card" data-testid="my-borrowed-books">
      <div className="turing-sidebar-header">
        <div className="turing-sidebar-title-wrap">
          <BookmarkCheck size={18} className="turing-blue-icon" />
          <h2 className="turing-sidebar-title">Sách Đang Mượn</h2>
        </div>
        <span className={`turing-limit-badge ${isFull ? 'limit-reached' : ''}`}>
          {borrowedIds.length}/{MAX_BORROW_LIMIT}
        </span>
      </div>

      {/* 3 Slot Indicator */}
      <div className="turing-slots-bar" aria-label="Chỉ số số sách được mượn">
        {Array.from({ length: MAX_BORROW_LIMIT }).map((_, index) => {
          const isSlotFilled = index < borrowedIds.length;
          return (
            <div
              key={index}
              className={`turing-slot-dot ${isSlotFilled ? 'filled' : 'empty'}`}
              title={isSlotFilled ? `Cuốn ${index + 1}: Đang mượn` : `Slot ${index + 1}: Còn trống`}
            />
          );
        })}
      </div>

      {isFull && (
        <div className="turing-sidebar-warning">
          <AlertCircle size={14} />
          <span>Đã đạt tối đa 3 cuốn. Vui lòng trả sách trước khi mượn tiếp.</span>
        </div>
      )}

      {borrowedBooks.length === 0 ? (
        <div className="turing-sidebar-empty">
          <div className="empty-icon-wrap">
            <BookOpen size={22} />
          </div>
          <p className="empty-title">Chưa có sách nào</p>
          <span className="empty-desc">
            Nhấn <strong>"Mượn sách"</strong> ở danh mục để đưa vào đây (tối đa 3 cuốn).
          </span>
        </div>
      ) : (
        <div className="turing-sidebar-list">
          {borrowedBooks.map((book) => (
            <article
              key={book.id}
              className="turing-mini-card"
              data-testid={`borrowed-item-${book.id}`}
            >
              <div className="mini-card-header">
                <span className="turing-category-badge mini">
                  <span>{book.category}</span>
                </span>
                <span className="mini-card-year">{book.publishedYear}</span>
              </div>

              <h4 className="mini-card-title" title={book.title}>
                {book.title}
              </h4>
              <p className="mini-card-author">{book.author}</p>

              <button
                type="button"
                className="turing-btn turing-btn-secondary mini-return-btn"
                onClick={() => handleReturn(book.id)}
                aria-label={`Trả sách ${book.title}`}
              >
                <RotateCcw size={13} />
                <span>Trả sách này</span>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
