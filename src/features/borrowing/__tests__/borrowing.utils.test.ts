import {
  canBorrowBook,
  hasReachedBorrowLimit,
  isAlreadyBorrowed,
  MAX_BORROW_LIMIT,
} from '../borrowing.utils';

describe('borrowing.utils', () => {
  it('xác định chính xác khi đã đạt giới hạn 3 cuốn sách', () => {
    expect(hasReachedBorrowLimit(['b1', 'b2'])).toBe(false);
    expect(hasReachedBorrowLimit(['b1', 'b2', 'b3'])).toBe(true);
    expect(hasReachedBorrowLimit(['b1', 'b2', 'b3', 'b4'])).toBe(true);
  });

  it('xác định chính xác sách đã được mượn hay chưa', () => {
    const borrowed = ['book-1', 'book-2'];
    expect(isAlreadyBorrowed(borrowed, 'book-1')).toBe(true);
    expect(isAlreadyBorrowed(borrowed, 'book-3')).toBe(false);
  });

  it('chặn mượn sách và trả về lý do khi sinh viên đã mượn đủ số lượng giới hạn', () => {
    const result = canBorrowBook(['b1', 'b2', 'b3'], 'b4', 5);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain(`tối đa ${MAX_BORROW_LIMIT} cuốn`);
  });

  it('chặn mượn sách nếu sách đó sinh viên đang mượn rồi', () => {
    const result = canBorrowBook(['b1'], 'b1', 5);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('đang mượn cuốn sách này rồi');
  });

  it('chặn mượn sách nếu sách đó đã hết bản in', () => {
    const result = canBorrowBook(['b1'], 'b2', 0);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('hết bản in');
  });

  it('cho phép mượn sách khi thỏa mãn toàn bộ điều kiện', () => {
    const result = canBorrowBook(['b1', 'b2'], 'b3', 2);
    expect(result.allowed).toBe(true);
    expect(result.reason).toBeUndefined();
  });
});
