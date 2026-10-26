import { Middleware } from '@reduxjs/toolkit';
import { borrowBook, setWarning } from '../../features/books/booksSlice';
import { MAX_BORROW_LIMIT } from '../../features/borrowing/borrowing.utils';

/**
 * Redux Middleware: Kiểm soát giới hạn mượn sách.
 * Chặn action borrowBook trước khi đến reducer nếu:
 * 1. Sinh viên đã mượn tối đa 3 cuốn sách.
 * 2. Cuốn sách đó sinh viên đang mượn rồi.
 * 3. Cuốn sách đó đã hết bản in (availableCopies <= 0).
 */
export const borrowLimitMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = storeAPI.getState();
    const booksState = state.books;
    const bookId = action.payload;

    // 1. Kiểm tra giới hạn 3 cuốn
    if (booksState.borrowedBookIds.length >= MAX_BORROW_LIMIT) {
      storeAPI.dispatch(
        setWarning(
          `Cảnh báo: Bạn chỉ được mượn tối đa ${MAX_BORROW_LIMIT} cuốn sách cùng lúc. Vui lòng trả bớt sách!`
        )
      );
      // Chặn action trước khi gọi next(action)
      return;
    }

    // 2. Kiểm tra sách đã được mượn chưa
    if (booksState.borrowedBookIds.includes(bookId)) {
      storeAPI.dispatch(
        setWarning('Cảnh báo: Bạn hiện đang mượn cuốn sách này rồi, không thể mượn trùng!')
      );
      return;
    }

    // 3. Kiểm tra số lượng bản sách còn lại
    const targetBook = booksState.items.find(
      (b: { id: string; availableCopies: number }) => b.id === bookId
    );
    if (targetBook && targetBook.availableCopies <= 0) {
      storeAPI.dispatch(
        setWarning('Cảnh báo: Đầu sách này hiện đã hết bản in trong thư viện.')
      );
      return;
    }
  }

  // Cho phép action tiếp tục nếu hợp lệ
  return next(action);
};
