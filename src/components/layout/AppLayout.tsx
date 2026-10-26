import React, { ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Header } from './Header';
import { ActivePage } from './Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectBooksWarning } from '../../features/books/booksSelectors';
import { clearWarning } from '../../features/books/booksSlice';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onSimulateErrorToggle?: (shouldFail: boolean) => void;
  isSimulatingError?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  onSimulateErrorToggle,
  isSimulatingError = false,
}) => {
  const dispatch = useAppDispatch();
  const warning = useAppSelector(selectBooksWarning);

  const handleDismissWarning = () => {
    dispatch(clearWarning());
  };

  return (
    <div className="app-container">
      <Header currentPage={currentPage} onNavigate={onNavigate} />

      <main className="main-content">
        {warning && (
          <div className="alert-banner alert-warning" role="alert" data-testid="warning-banner">
            <div className="alert-content">
              <AlertTriangle size={20} />
              <span>{warning}</span>
            </div>
            <button
              type="button"
              className="alert-close-btn"
              onClick={handleDismissWarning}
              aria-label="Đóng cảnh báo"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {children}
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} Mini Library · Bài tập Lập trình Web Nâng cao (LTWNC_GK)
          </p>
          <div className="dev-controls">
            <span>Mô phỏng API:</span>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isSimulatingError}
                onChange={(e) => onSimulateErrorToggle?.(e.target.checked)}
              />
              <span style={{ fontSize: '0.75rem' }}>Mô phỏng lỗi mạng (HTTP 500)</span>
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
};
