import React, { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllBooks,
  selectBorrowedBookIds,
  selectBooksStatus,
  selectBooksError,
} from '../../features/books/booksSelectors';
import { borrowBook, returnBook } from '../../features/books/booksSlice';
import { fetchBooks } from '../../features/books/booksThunks';
import { useFilterStore } from '../../features/filters/filterStore';
import { useDebounce } from '../../hooks/useDebounce';
import { filterBooks } from '../../features/books/books.utils';
import { BookCard } from './BookCard';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { EmptyState } from '../common/EmptyState';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const borrowedBookIds = useAppSelector(selectBorrowedBookIds);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);

  const keyword = useFilterStore((state) => state.keyword);
  const category = useFilterStore((state) => state.category);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  // Buổi 5: Tối ưu hiệu năng - Trì hoãn từ khóa tìm kiếm 300ms
  const debouncedKeyword = useDebounce(keyword, 300);

  // Buổi 5: Tối ưu hiệu năng - Memo hóa danh sách sách sau khi lọc
  const filteredBooks = useMemo(() => {
    return filterBooks(books, debouncedKeyword, category);
  }, [books, debouncedKeyword, category]);

  // Buổi 5: Tối ưu hiệu năng - Memoize các callback truyền xuống các component con
  const handleBorrow = useCallback(
    (bookId: string) => {
      dispatch(borrowBook(bookId));
    },
    [dispatch]
  );

  const handleReturn = useCallback(
    (bookId: string) => {
      dispatch(returnBook(bookId));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading message="Đang tải danh mục sách chuyên ngành..." />;
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error || 'Đã có lỗi xảy ra trong quá trình tải sách.'}
        onRetry={handleRetry}
      />
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy cuốn sách nào"
        description={
          keyword || category !== 'ALL'
            ? 'Không có kết quả nào khớp với bộ lọc hiện tại. Thử xóa tìm kiếm hoặc đổi thể loại.'
            : 'Hiện tại chưa có sách nào trong kho thư viện.'
        }
        actionText={keyword || category !== 'ALL' ? 'Đặt lại bộ lọc' : undefined}
        onAction={resetFilters}
      />
    );
  }

  return (
    <div className="book-grid" data-testid="book-grid">
      {filteredBooks.map((book) => {
        const isBorrowed = borrowedBookIds.includes(book.id);
        return (
          <BookCard
            key={book.id}
            book={book}
            isBorrowed={isBorrowed}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        );
      })}
    </div>
  );
};
