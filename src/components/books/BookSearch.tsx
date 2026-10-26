import React from 'react';
import { Search, X } from 'lucide-react';
import { useFilterStore } from '../../features/filters/filterStore';
import { useAppSelector } from '../../app/hooks';
import { selectAllBooks } from '../../features/books/booksSelectors';

export const BookSearch: React.FC = () => {
  const keyword = useFilterStore((state) => state.keyword);
  const setKeyword = useFilterStore((state) => state.setKeyword);
  const books = useAppSelector(selectAllBooks);

  const totalCount = books.length;
  const availableCount = books.filter((b) => b.availableCopies > 0).length;
  const newYearCount = books.filter((b) => b.publishedYear >= 2023).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClear = () => {
    setKeyword('');
  };

  return (
    <div className="turing-search-row">
      <div className="turing-search-wrapper">
        <Search className="turing-search-icon" size={17} />
        <input
          type="text"
          className="turing-search-input"
          placeholder="Tìm kiếm sách, tác giả hoặc từ khóa chuyên ngành..."
          value={keyword}
          onChange={handleChange}
          aria-label="Tìm kiếm sách"
          data-testid="search-input"
        />
        {keyword && (
          <button
            type="button"
            className="turing-search-clear"
            onClick={handleClear}
            aria-label="Xóa từ khóa tìm kiếm"
            title="Xóa"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Turing-style Quick Stat Badges next to Search */}
      <div className="turing-quick-badges" aria-label="Thống kê nhanh">
        <div className="turing-quick-badge dark-badge">
          <span className="badge-title">All</span>
          <span className="badge-count-num">{totalCount}</span>
        </div>
        <div className="turing-quick-badge light-badge">
          <span className="badge-title">Có sẵn</span>
          <span className="badge-count-num">{availableCount}</span>
        </div>
        <div className="turing-quick-badge light-badge">
          <span className="badge-title">Mới</span>
          <span className="badge-count-num">{newYearCount}</span>
        </div>
      </div>
    </div>
  );
};
