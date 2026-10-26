export const MAX_BORROW_LIMIT = 3;

/**
 * Kiểm tra xem sinh viên đã mượn cuốn sách này chưa.
 */
export function isAlreadyBorrowed(borrowedBookIds: string[], bookId: string): boolean {
  return borrowedBookIds.includes(bookId);
}

/**
 * Kiểm tra xem sinh viên đã đạt giới hạn tối đa số sách được mượn hay chưa.
 */
export function hasReachedBorrowLimit(borrowedBookIds: string[]): boolean {
  return borrowedBookIds.length >= MAX_BORROW_LIMIT;
}

/**
 * Kiểm tra toàn diện điều kiện mượn sách.
 */
export function canBorrowBook(
  borrowedBookIds: string[],
  bookId: string,
  availableCopies: number
): { allowed: boolean; reason?: string } {
  if (hasReachedBorrowLimit(borrowedBookIds)) {
    return {
      allowed: false,
      reason: `Bạn đã mượn tối đa ${MAX_BORROW_LIMIT} cuốn sách. Vui lòng trả sách trước khi mượn thêm!`,
    };
  }

  if (isAlreadyBorrowed(borrowedBookIds, bookId)) {
    return {
      allowed: false,
      reason: 'Bạn hiện đang mượn cuốn sách này rồi, không thể mượn thêm cùng một đầu sách.',
    };
  }

  if (availableCopies <= 0) {
    return {
      allowed: false,
      reason: 'Sách này hiện đã hết bản in trong thư viện.',
    };
  }

  return { allowed: true };
}
