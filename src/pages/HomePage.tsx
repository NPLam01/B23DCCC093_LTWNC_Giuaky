import React from 'react';
import { BookSearch } from '../components/books/BookSearch';
import { BookFilter } from '../components/books/BookFilter';
import { BookList } from '../components/books/BookList';
import { MyBorrowedBooks } from '../components/books/MyBorrowedBooks';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page" data-testid="home-page">
      {/* Turing-style Page Title: "Explore roles" */}
      <section className="turing-hero-section">
        <h1 className="turing-main-title">Explore books</h1>
        <p className="turing-subtitle">
          Tra cứu, mượn và hoàn trả tài liệu học tập chuyên ngành. Mỗi sinh viên được mượn tối đa 3 cuốn cùng lúc.
        </p>

        {/* Filters Area: Row 1 Search & Quick Badges, Row 2 Category Pills */}
        <div className="turing-filter-section">
          <BookSearch />
          <BookFilter />
        </div>
      </section>

      {/* 2-Column Split: Left Books Grid, Right Vertical Sidebar */}
      <div className="home-layout-container">
        <div className="home-books-column">
          <section aria-label="Danh mục sách">
            <BookList />
          </section>
        </div>

        <aside className="home-sidebar-column" aria-label="Sách đang mượn">
          <MyBorrowedBooks />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
