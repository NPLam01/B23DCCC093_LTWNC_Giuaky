import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="state-center-box" role="alert">
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AlertCircle size={32} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>
          Không thể tải dữ liệu
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: 450 }}>{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRetry}
          style={{ marginTop: 8 }}
        >
          <RefreshCw size={16} />
          <span>Thử lại</span>
        </button>
      )}
    </div>
  );
};
