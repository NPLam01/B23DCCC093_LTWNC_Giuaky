import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không tìm thấy sách nào',
  description = 'Vui lòng thử lại với từ khóa tìm kiếm hoặc thể loại khác.',
  actionText,
  onAction,
}) => {
  return (
    <div className="state-center-box">
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookOpen size={30} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: 420 }}>{description}</p>
      </div>
      {actionText && onAction && (
        <button type="button" className="btn btn-secondary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};
