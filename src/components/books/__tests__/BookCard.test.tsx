import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from '../BookCard';
import { Book } from '../../../types';

describe('BookCard component', () => {
  const sampleBook: Book = {
    id: 'book-001',
    title: 'Học Máy và Trí Tuệ Nhân Tạo',
    author: 'Nguyễn Văn A',
    category: 'CNTT',
    publishedYear: 2024,
    availableCopies: 3,
  };

  // Test 1: Hiển thị đầy đủ thông tin sách
  it('hiển thị chính xác thông tin tiêu đề, tác giả, thể loại và số bản còn lại', () => {
    const mockOnBorrow = jest.fn();

    render(
      <BookCard
        book={sampleBook}
        onBorrow={mockOnBorrow}
      />
    );

    expect(screen.getByText('Học Máy và Trí Tuệ Nhân Tạo')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('3 cuốn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mượn sách/i })).toBeEnabled();
  });

  // Test 2: Click nút Mượn gọi handler với đúng ID
  it('gọi hàm onBorrow với đúng book.id khi người dùng nhấn nút Mượn', async () => {
    const user = userEvent.setup();
    const mockOnBorrow = jest.fn();

    render(
      <BookCard
        book={sampleBook}
        onBorrow={mockOnBorrow}
      />
    );

    const borrowButton = screen.getByRole('button', { name: /mượn sách/i });
    await user.click(borrowButton);

    expect(mockOnBorrow).toHaveBeenCalledTimes(1);
    expect(mockOnBorrow).toHaveBeenCalledWith('book-001');
  });

  // Test 3: Nút Mượn bị vô hiệu hóa khi hết bản
  it('vô hiệu hóa (disabled) nút Mượn sách khi availableCopies bằng 0', () => {
    const outOfStockBook: Book = {
      ...sampleBook,
      availableCopies: 0,
    };
    const mockOnBorrow = jest.fn();

    render(
      <BookCard
        book={outOfStockBook}
        onBorrow={mockOnBorrow}
      />
    );

    const borrowButton = screen.getByRole('button', { name: /mượn sách/i });
    expect(borrowButton).toBeDisabled();
    expect(screen.getByText('Hết sách')).toBeInTheDocument();
  });

  // Test 4 (Bổ sung): Hiển thị trạng thái khi sách đang được mượn
  it('hiển thị nhãn "Đang mượn" khi isBorrowed = true và gọi onReturn khi nhấn nút Trả', async () => {
    const user = userEvent.setup();
    const mockOnBorrow = jest.fn();
    const mockOnReturn = jest.fn();

    render(
      <BookCard
        book={sampleBook}
        isBorrowed={true}
        onBorrow={mockOnBorrow}
        onReturn={mockOnReturn}
      />
    );

    expect(screen.getByText('Đang mượn')).toBeInTheDocument();

    const returnBtn = screen.getByRole('button', { name: /trả/i });
    await user.click(returnBtn);

    expect(mockOnReturn).toHaveBeenCalledWith('book-001');
  });
});
