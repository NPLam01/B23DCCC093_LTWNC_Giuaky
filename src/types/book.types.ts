export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishedYear: number;
  availableCopies: number;
  description?: string;
}

/**
 * Utility Type 1: Pick
 * Dùng để trích xuất các thông tin tóm tắt của sách khi xem trước hoặc hiển thị danh sách rút gọn.
 */
export type BookPreview = Pick<Book, 'id' | 'title' | 'author'>;

/**
 * Utility Type 2: Partial & Pick
 * Dùng cho các tác vụ cập nhật một phần thông tin sách (title, author, category) mà không cần truyền toàn bộ thuộc tính.
 */
export type BookUpdate = Partial<Pick<Book, 'title' | 'author' | 'category'>>;

/**
 * Utility Type 3: Readonly & Record (bổ sung an toàn dữ liệu)
 * Thông tin thống kê số lượng sách theo thể loại
 */
export type CategoryStatistics = Readonly<Record<BookCategory, number>>;
