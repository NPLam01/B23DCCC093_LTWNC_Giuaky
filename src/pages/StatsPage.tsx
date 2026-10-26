import React from 'react';
import { BookOpen, BookmarkCheck, Layers, BookCopy, PieChart } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import {
  selectAllBooks,
  selectTotalBooksCount,
  selectTotalBorrowedCount,
  selectCategoryCounts,
} from '../features/books/booksSelectors';
import { calculateTotalCopies } from '../features/books/books.utils';
import { BookCategory } from '../types';

export const StatsPage: React.FC = () => {
  const books = useAppSelector(selectAllBooks);
  const totalBooks = useAppSelector(selectTotalBooksCount);
  const borrowedCount = useAppSelector(selectTotalBorrowedCount);
  const categoryCounts = useAppSelector(selectCategoryCounts);

  const totalCopies = calculateTotalCopies(books);

  const categories: BookCategory[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ'];

  return (
    <div className="stats-container" data-testid="stats-page">
      <div className="hero-banner">
        <div className="hero-text">
          <h1>Báo Cáo &amp; Thống Kê Thư Viện</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <BookOpen size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-number">{totalBooks}</span>
            <span className="stat-label">Tổng đầu sách</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              color: 'var(--accent-cyan)',
            }}
          >
            <BookmarkCheck size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-number">{borrowedCount}</span>
            <span className="stat-label">Sách đang mượn</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(5, 150, 105, 0.12)',
              color: 'var(--status-success)',
            }}
          >
            <BookCopy size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-number">{totalCopies}</span>
            <span className="stat-label">Tổng số bản in còn lại</span>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(71, 85, 105, 0.12)',
              color: 'var(--text-secondary)',
            }}
          >
            <Layers size={26} />
          </div>
          <div className="stat-details">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Chuyên ngành chính</span>
          </div>
        </div>
      </div>

      <div className="stats-breakdown-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <PieChart size={22} color="var(--primary-blue)" />
          <h2 className="stats-breakdown-title" style={{ margin: 0 }}>
            Phân Bổ Đầu Sách Theo Chuyên Ngành
          </h2>
        </div>

        <div className="progress-bar-group">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const percentage = totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0;

            return (
              <div key={cat} className="progress-item">
                <div className="progress-item-label">
                  <span>{cat}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    <strong>{count}</strong> cuốn ({percentage}%)
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
