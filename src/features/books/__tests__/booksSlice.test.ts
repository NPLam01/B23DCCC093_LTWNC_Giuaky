import booksReducer, {
  initialState,
  borrowBook,
  returnBook,
  setWarning,
  clearWarning,
  BooksState,
} from '../booksSlice';
import { fetchBooks } from '../booksThunks';
import { mockBooks } from '../../../test/mocks/mockBooks';

describe('booksSlice reducer', () => {
  // Test 1: Khởi tạo state mặc định
  it('nên trả về state khởi tạo ban đầu khi truyền action không xác định', () => {
    const state = booksReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
    expect(state.status).toBe('idle');
    expect(state.items).toEqual([]);
    expect(state.borrowedBookIds).toEqual([]);
  });

  // Test 2: Tải thành công danh sách sách (fetchBooks.fulfilled)
  it('nên cập nhật danh sách sách và đổi status thành succeeded khi fetchBooks.fulfilled', () => {
    const prevState: BooksState = {
      ...initialState,
      status: 'loading',
    };

    const action = {
      type: fetchBooks.fulfilled.type,
      payload: mockBooks,
    };

    const nextState = booksReducer(prevState, action);
    expect(nextState.status).toBe('succeeded');
    expect(nextState.items).toHaveLength(mockBooks.length);
    expect(nextState.items[0].title).toBe(mockBooks[0].title);
    expect(nextState.error).toBeNull();
  });

  // Test 3: Tải thất bại (fetchBooks.rejected)
  it('nên cập nhật thông báo lỗi và đổi status thành failed khi fetchBooks.rejected', () => {
    const prevState: BooksState = {
      ...initialState,
      status: 'loading',
    };

    const errorMessage = 'Lỗi kết nối máy chủ';
    const action = {
      type: fetchBooks.rejected.type,
      payload: errorMessage,
    };

    const nextState = booksReducer(prevState, action);
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.items).toEqual([]);
  });

  // Test 4: Mượn và trả sách cập nhật số bản chính xác
  it('nên giảm availableCopies và thêm id vào borrowedBookIds khi mượn, sau đó hoàn trả chính xác', () => {
    const startState: BooksState = {
      ...initialState,
      items: [
        {
          id: 'test-1',
          title: 'Sách A',
          author: 'Tác giả A',
          category: 'CNTT',
          publishedYear: 2024,
          availableCopies: 3,
        },
      ],
      borrowedBookIds: [],
    };

    // Thực hiện mượn sách
    const borrowedState = booksReducer(startState, borrowBook('test-1'));
    expect(borrowedState.items[0].availableCopies).toBe(2);
    expect(borrowedState.borrowedBookIds).toEqual(['test-1']);

    // Thực hiện trả sách
    const returnedState = booksReducer(borrowedState, returnBook('test-1'));
    expect(returnedState.items[0].availableCopies).toBe(3);
    expect(returnedState.borrowedBookIds).toEqual([]);
  });

  // Test 5 (Bổ sung): Bảo vệ điều kiện không mượn khi sách đã hết bản
  it('không được giảm availableCopies xuống âm khi sách đã hết bản in', () => {
    const outOfStockState: BooksState = {
      ...initialState,
      items: [
        {
          id: 'test-out',
          title: 'Sách Hết Bản',
          author: 'Tác giả',
          category: 'CNTT',
          publishedYear: 2024,
          availableCopies: 0,
        },
      ],
      borrowedBookIds: [],
    };

    const resultState = booksReducer(outOfStockState, borrowBook('test-out'));
    expect(resultState.items[0].availableCopies).toBe(0);
    expect(resultState.borrowedBookIds).toHaveLength(0);
  });

  // Test 6 (Bổ sung): Quản lý warning message
  it('nên cập nhật và xóa thông báo warning chính xác', () => {
    const withWarning = booksReducer(initialState, setWarning('Cảnh báo quá hạn'));
    expect(withWarning.warning).toBe('Cảnh báo quá hạn');

    const cleared = booksReducer(withWarning, clearWarning());
    expect(cleared.warning).toBeNull();
  });
});
