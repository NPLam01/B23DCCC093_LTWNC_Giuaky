import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Book, BookCategory } from '../../types';

export const selectBooksState = (state: RootState) => state.books;

export const selectAllBooks = (state: RootState): Book[] => state.books.items;

export const selectBorrowedBookIds = (state: RootState): string[] =>
  state.books.borrowedBookIds;

export const selectBooksStatus = (state: RootState) => state.books.status;

export const selectBooksError = (state: RootState): string | null =>
  state.books.error;

export const selectBooksWarning = (state: RootState): string | null =>
  state.books.warning;

/**
 * Selector lấy danh sách chi tiết các cuốn sách sinh viên đang mượn.
 */
export const selectBorrowedBooksList = createSelector(
  [selectAllBooks, selectBorrowedBookIds],
  (books, borrowedIds): Book[] => {
    return books.filter((book) => borrowedIds.includes(book.id));
  }
);

/**
 * Thống kê tổng số lượng đầu sách.
 */
export const selectTotalBooksCount = createSelector(
  [selectAllBooks],
  (books): number => books.length
);

/**
 * Thống kê số lượng sách đang mượn.
 */
export const selectTotalBorrowedCount = createSelector(
  [selectBorrowedBookIds],
  (borrowedIds): number => borrowedIds.length
);

/**
 * Thống kê số lượng đầu sách theo từng chuyên ngành.
 */
export const selectCategoryCounts = createSelector(
  [selectAllBooks],
  (books): Record<BookCategory, number> => {
    const counts: Record<BookCategory, number> = {
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };
    for (const book of books) {
      if (book.category in counts) {
        counts[book.category] += 1;
      }
    }
    return counts;
  }
);
