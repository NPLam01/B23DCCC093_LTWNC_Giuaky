import { setupStore } from '../../store';
import { borrowBook } from '../../../features/books/booksSlice';
import { Book } from '../../../types';

describe('borrowLimitMiddleware', () => {
  const sampleBooks: Book[] = [
    { id: 'b1', title: 'Sách 1', author: 'A', category: 'CNTT', publishedYear: 2024, availableCopies: 2 },
    { id: 'b2', title: 'Sách 2', author: 'B', category: 'CNTT', publishedYear: 2024, availableCopies: 2 },
    { id: 'b3', title: 'Sách 3', author: 'C', category: 'CNTT', publishedYear: 2024, availableCopies: 2 },
    { id: 'b4', title: 'Sách 4', author: 'D', category: 'CNTT', publishedYear: 2024, availableCopies: 2 },
  ];

  it('chặn action borrowBook khi sinh viên đã mượn đủ 3 cuốn và phát warning', () => {
    const store = setupStore({
      books: {
        items: sampleBooks,
        borrowedBookIds: ['b1', 'b2', 'b3'],
        status: 'succeeded',
        error: null,
        warning: null,
      },
    });

    // Cố gắng mượn cuốn thứ 4
    store.dispatch(borrowBook('b4'));

    const state = store.getState().books;
    // Không cho mượn: borrowedBookIds vẫn là 3 cuốn
    expect(state.borrowedBookIds).toEqual(['b1', 'b2', 'b3']);
    // Available copies của cuốn 4 không bị giảm
    expect(state.items.find((b) => b.id === 'b4')?.availableCopies).toBe(2);
    // Warning xuất hiện
    expect(state.warning).toContain('chỉ được mượn tối đa 3 cuốn');
  });

  it('cho phép mượn sách bình thường khi chưa đủ 3 cuốn', () => {
    const store = setupStore({
      books: {
        items: sampleBooks,
        borrowedBookIds: ['b1'],
        status: 'succeeded',
        error: null,
        warning: null,
      },
    });

    store.dispatch(borrowBook('b2'));

    const state = store.getState().books;
    expect(state.borrowedBookIds).toContain('b2');
    expect(state.items.find((b) => b.id === 'b2')?.availableCopies).toBe(1);
    expect(state.warning).toBeNull();
  });
});
