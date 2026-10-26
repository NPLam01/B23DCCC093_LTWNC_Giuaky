import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchBooks } from './features/books/booksThunks';
import { setSimulateApiError } from './api/booksApi';
import { AppLayout } from './components/layout/AppLayout';
import { AppRouter } from './routes/AppRouter';
import { ActivePage } from './components/layout/Navigation';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<ActivePage>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'stats' ? 'stats' : 'home';
  });
  const [isSimulatingError, setIsSimulatingError] = useState<boolean>(false);

  useEffect(() => {
    // Tải danh sách sách ban đầu
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleSimulateErrorToggle = (shouldFail: boolean) => {
    setIsSimulatingError(shouldFail);
    setSimulateApiError(shouldFail);
    // Tải lại để kiểm tra trạng thái lỗi hoặc phục hồi
    dispatch(fetchBooks(shouldFail));
  };

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      isSimulatingError={isSimulatingError}
      onSimulateErrorToggle={handleSimulateErrorToggle}
    >
      <AppRouter currentPage={currentPage} />
    </AppLayout>
  );
};

export default App;
