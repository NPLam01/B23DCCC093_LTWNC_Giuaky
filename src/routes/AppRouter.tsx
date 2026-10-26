import React, { Suspense, lazy } from 'react';
import { HomePage } from '../pages/HomePage';
import { Loading } from '../components/common/Loading';
import { ActivePage } from '../components/layout/Navigation';

// Buổi 5: Tối ưu hiệu năng - Tải trang /stats bằng React.lazy
const StatsPage = lazy(() => import('../pages/StatsPage'));

interface AppRouterProps {
  currentPage: ActivePage;
}

export const AppRouter: React.FC<AppRouterProps> = ({ currentPage }) => {
  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'stats' && (
        <Suspense fallback={<Loading message="Đang tải dữ liệu thống kê..." />}>
          <StatsPage />
        </Suspense>
      )}
    </>
  );
};
