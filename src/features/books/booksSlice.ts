import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types';
import { fetchBooks } from './booksThunks';

export interface BooksState {
  items: Book[];
  borrowedBookIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  warning: string | null;
}

export const initialState: BooksState = {
  items: [],
  borrowedBookIds: [],
  status: 'idle',
  error: null,
  warning: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      const book = state.items.find((b) => b.id === bookId);

      // Bảo vệ ở tầng reducer chống số bản âm hoặc mượn lặp
      if (!book) return;
      if (state.borrowedBookIds.includes(bookId)) return;
      if (book.availableCopies <= 0) return;

      book.availableCopies -= 1;
      state.borrowedBookIds.push(bookId);
      state.warning = null;
    },
    returnBook: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      if (!state.borrowedBookIds.includes(bookId)) return;

      const book = state.items.find((b) => b.id === bookId);
      if (book) {
        book.availableCopies += 1;
      }

      state.borrowedBookIds = state.borrowedBookIds.filter((id) => id !== bookId);
      state.warning = null;
    },
    setWarning: (state, action: PayloadAction<string | null>) => {
      state.warning = action.payload;
    },
    clearWarning: (state) => {
      state.warning = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Không thể tải danh sách sách từ máy chủ.';
      });
  },
});

export const {
  borrowBook,
  returnBook,
  setWarning,
  clearWarning,
  clearError,
} = booksSlice.actions;

export default booksSlice.reducer;
