import { Book } from '../../types';

export const mockBooks: Book[] = [
  {
    id: 'test-1',
    title: 'Lập Trình Web Nâng Cao với React',
    author: 'Nguyễn Văn A',
    category: 'CNTT',
    publishedYear: 2024,
    availableCopies: 3,
  },
  {
    id: 'test-2',
    title: 'Kinh Tế Vi Mô Ứng Dụng',
    author: 'Trần Thị B',
    category: 'Kinh tế',
    publishedYear: 2023,
    availableCopies: 0, // Hết sách
  },
  {
    id: 'test-3',
    title: 'Tiếng Anh Giao Tiếp Học Thuật',
    author: 'John Doe',
    category: 'Ngoại ngữ',
    publishedYear: 2022,
    availableCopies: 2,
  },
];
