import React from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Đang tải dữ liệu sách...' }) => {
  return (
    <div className="state-center-box" role="status" aria-live="polite">
      <div className="spinner" />
      <p style={{ fontWeight: 600 }}>{message}</p>
    </div>
  );
};
