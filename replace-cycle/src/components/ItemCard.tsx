import { useState } from 'react';
import type { ItemWithStatus } from '../types';

interface ItemCardProps {
  item: ItemWithStatus;
  onMarkReplaced: (id: string) => void;
  onEdit: (item: ItemWithStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  ok: '양호',
  soon: '교체 임박',
  due: '교체 필요',
  overdue: '기한 초과',
  completed: '완료됨',
};

const STATUS_COLORS: Record<string, string> = {
  ok: 'status-ok',
  soon: 'status-soon',
  due: 'status-due',
  overdue: 'status-overdue',
  completed: 'status-completed',
};

const PROGRESS_COLORS: Record<string, string> = {
  ok: '#00c8c3',
  soon: '#eab308',
  due: '#f97316',
  overdue: '#ef4444',
  completed: '#00c8c3',
};

export const ItemCard = ({ item, onMarkReplaced, onEdit, onDelete }: ItemCardProps) => {
  const { daysRemaining, progress, status } = item;
  const [isCompleting, setIsCompleting] = useState(false);

  const daysLabel =
    status === 'completed'
      ? '오늘 완료!'
      : daysRemaining > 0
        ? `${daysRemaining}일 남음`
        : daysRemaining === 0
          ? '오늘 교체!'
          : `${Math.abs(daysRemaining)}일 초과`;

  const handleComplete = () => {
    setIsCompleting(true);

    // 애니메이션 효과 후 즉시 완료 처리
    setTimeout(() => {
      onMarkReplaced(item.id);
      setIsCompleting(false);
    }, 800);
  };

  return (
    <div className={`item-card item-card--${status}${isCompleting ? ' item-card--completing' : ''}`}>
      <div className="item-card__header">
        <span className="item-card__icon">{item.icon}</span>
        <div className="item-card__info">
          <div className="item-card__name-row">
            <span className="item-card__name">{item.name}</span>
            <span className={`status-badge ${STATUS_COLORS[status]}`}>
              {STATUS_LABELS[status]}
            </span>
            <span className={`type-badge type-badge--${item.type === '교체' ? 'replace' : 'wash'}`}>
              {item.type === '교체' ? '🔄 교체' : '👕 세탁'}
            </span>
          </div>
          <span className="item-card__category">{item.category}</span>
        </div>
        <div className="item-card__actions">
          <button
            className="btn-icon"
            onClick={() => onEdit(item)}
            aria-label="편집"
            title="편집"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-icon--danger"
            onClick={() => onDelete(item.id)}
            aria-label="삭제"
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="item-card__progress-section">
        <div className="item-card__days-row">
          <span className="item-card__interval">매 {item.intervalDays}일마다 교체</span>
          <span className={`item-card__days item-card__days--${status}`}>{daysLabel}</span>
        </div>
        <div className={`progress-bar${status === 'completed' ? ' progress-bar--completed' : ''}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={`progress-bar__fill${isCompleting ? ' progress-bar__fill--animating' : ''}`}
            style={{
              width: `${progress}%`,
              backgroundColor: PROGRESS_COLORS[status],
            }}
          />
        </div>
      </div>

      <div className="item-card__footer">
        <span className="item-card__last-replaced">
          마지막 교체: {item.lastReplacedAt}
        </span>
        {status === 'completed' ? (
          <span className="completion-badge">✨ 오늘 완료했어요!</span>
        ) : (
          <button
            className="btn btn--primary btn--sm"
            onClick={handleComplete}
            disabled={isCompleting}
          >
            {isCompleting ? '✨ 완료 중...' : `✅ ${item.type === '교체' ? '교체' : '세탁'} 완료`}
          </button>
        )}
      </div>
    </div>
  );
};
