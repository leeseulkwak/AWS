import { useState } from 'react';
import type { HygieneTip } from '../data/hygieneTips';

interface HygieneTipCardProps {
  tip: HygieneTip;
  onAdd: (tip: HygieneTip) => void;
}

export const HygieneTipCard = ({ tip, onAdd }: HygieneTipCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(tip);
  };

  return (
    <div
      className={`hygiene-tip-card${isExpanded ? ' hygiene-tip-card--expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="hygiene-tip-card__header">
        <span className="hygiene-tip-card__icon">{tip.icon}</span>
        <div className="hygiene-tip-card__meta">
          <div className="hygiene-tip-card__name-row">
            <span className="hygiene-tip-card__name">{tip.name}</span>
            <span className={`type-badge type-badge--${tip.type === '교체' ? 'replace' : 'wash'}`}>
              {tip.type === '교체' ? '🔄 교체' : '👕 세탁'}
            </span>
          </div>
          <span className="hygiene-tip-card__interval">권장 {tip.type} 주기 · {tip.intervalDays >= 365 ? `${tip.intervalDays / 365}년` : `${tip.intervalDays}일`}</span>
        </div>
        <div className="hygiene-tip-card__actions">
          <button
            className="btn btn--primary btn--sm hygiene-tip-card__add-btn"
            onClick={handleAddClick}
          >
            + 추가
          </button>
          <span className="hygiene-tip-card__expand-icon">
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>
      </div>
      {isExpanded && (
        <p className="hygiene-tip-card__tip">{tip.tip}</p>
      )}
    </div>
  );
};
