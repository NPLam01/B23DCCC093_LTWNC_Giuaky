import React from 'react';
import { BookOpen, BarChart3 } from 'lucide-react';

export type ActivePage = 'home' | 'stats';

interface NavigationProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="nav-links" aria-label="Menu chính">
      <button
        type="button"
        className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
        aria-current={currentPage === 'home' ? 'page' : undefined}
      >
        <BookOpen size={17} />
        <span>Kho Sách</span>
      </button>
      <button
        type="button"
        className={`nav-item ${currentPage === 'stats' ? 'active' : ''}`}
        onClick={() => onNavigate('stats')}
        aria-current={currentPage === 'stats' ? 'page' : undefined}
      >
        <BarChart3 size={17} />
        <span>Thống Kê</span>
      </button>
    </nav>
  );
};
