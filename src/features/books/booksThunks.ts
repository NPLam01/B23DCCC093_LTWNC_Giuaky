import { createAsyncThunk } from '@reduxjs/toolkit';
import { Book, isApiSuccess } from '../../types';
import { fetchBooksApi } from '../../api/booksApi';

/**
 * Async Thunk tải danh sách sách từ API giả lập.
 * Hỗ trợ tham số simulateError để mô phỏng và kiểm thử trạng thái rejected.
 */
export const fetchBooks = createAsyncThunk<
  Book[],
  boolean | undefined,
  { rejectValue: string }
>('books/fetchBooks', async (simulateError = false, { rejectWithValue }) => {
  const result = await fetchBooksApi(simulateError);

  if (isApiSuccess(result)) {
    return result.data;
  }

  return rejectWithValue(result.error);
});
