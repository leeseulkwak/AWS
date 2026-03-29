interface EmptyStateProps {
  onAddItem: () => void;
}

export const EmptyState = ({ onAddItem }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">📦</div>
      <h2 className="empty-state__title">소모품이 없어요</h2>
      <p className="empty-state__desc">
        교체 주기를 관리할 소모품을 추가해보세요.
      </p>
      <div className="empty-state__actions">
        <button className="btn btn--primary" onClick={onAddItem}>
          ✏️ 직접 추가
        </button>
      </div>
    </div>
  );
};
