import React from 'react';
import { Moon, Sun, ChevronDown, BookmarkCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector } from '../../app/hooks';
import { selectTotalBorrowedCount } from '../../features/books/booksSelectors';
import { Navigation, ActivePage } from './Navigation';
import { MAX_BORROW_LIMIT } from '../../features/borrowing/borrowing.utils';

interface HeaderProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const borrowedCount = useAppSelector(selectTotalBorrowedCount);

  return (
    <header className="turing-header">
      <div className="turing-header-inner">
        {/* Brand Logo - Turing Monospace Minimalist Style */}
        <div className="turing-brand-group">
          <a
            href="#home"
            className="turing-brand-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            <span className="turing-brand-symbol">◆</span>
            <span className="turing-brand-text">MINI LIBRARY</span>
          </a>

          {/* Navigation Links (Home, Kho Sách, Thống Kê) */}
          <Navigation currentPage={currentPage} onNavigate={onNavigate} />
        </div>

        {/* Right Header: Borrowed Pill, Theme Toggle, User Profile Avatar */}
        <div className="turing-header-right">
          <button
            type="button"
            className="turing-borrowed-badge"
            onClick={() => onNavigate('home')}
            title="Sách đang mượn"
          >
            <BookmarkCheck size={14} />
            <span>Mượn</span>
            <span className="turing-badge-num">
              {borrowedCount}/{MAX_BORROW_LIMIT}
            </span>
          </button>

          <button
            type="button"
            className="turing-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Chuyển sang chế độ ${theme === 'light' ? 'tối' : 'sáng'}`}
            title={`Chuyển sang chế độ ${theme === 'light' ? 'tối' : 'sáng'}`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* User Avatar Circle - Inspired by 'L Lam Nguyen Phuc ⌵' in image */}
          <div className="turing-user-profile" title="Tài khoản sinh viên">
            <div className="turing-avatar">L</div>
            <span className="turing-username">Lam Nguyen Phuc</span>
            <ChevronDown size={14} className="turing-chevron" />
          </div>
        </div>
      </div>
    </header>
  );
};
