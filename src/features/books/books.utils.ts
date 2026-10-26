import { Book, BookCategory } from '../../types';

/**
 * Lọc danh sách sách theo từ khóa (tiêu đề, tác giả) và thể loại.
 * Chuẩn hóa chuỗi bằng trim() và toLowerCase() để tìm kiếm không phân biệt hoa thường.
 */
export function filterBooks(
  books: Book[],
  keyword: string,
  category: BookCategory | 'ALL'
): Book[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return books.filter((book) => {
    const matchCategory = category === 'ALL' || book.category === category;
    if (!matchCategory) return false;

    if (!normalizedKeyword) return true;

    const matchTitle = book.title.toLowerCase().includes(normalizedKeyword);
    const matchAuthor = book.author.toLowerCase().includes(normalizedKeyword);

    return matchTitle || matchAuthor;
  });
}

/**
 * Tính toán thống kê số lượng đầu sách theo từng thể loại.
 */
export function calculateCategoryStats(books: Book[]): Record<BookCategory, number> {
  const stats: Record<BookCategory, number> = {
    CNTT: 0,
    'Kinh tế': 0,
    'Ngoại ngữ': 0,
  };

  for (const book of books) {
    if (book.category in stats) {
      stats[book.category] += 1;
    }
  }

  return stats;
}

/**
 * Tính tổng số bản sách thực tế còn trong thư viện.
 */
export function calculateTotalCopies(books: Book[]): number {
  return books.reduce((sum, book) => sum + book.availableCopies, 0);
}
