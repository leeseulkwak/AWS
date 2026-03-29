import type { HygieneTip } from '../data/hygieneTips';

interface HygieneTipCardProps {
  tip: HygieneTip;
  onAdd: (tip: HygieneTip) => void;
}

export const HygieneTipCard = ({ tip, onAdd }: HygieneTipCardProps) => {
  return (
    <div className="hygiene-tip-card">
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
        <button
          className="btn btn--primary btn--sm hygiene-tip-card__add-btn"
          onClick={() => onAdd(tip)}
        >
          + 추가
        </button>
      </div>
      <p className="hygiene-tip-card__tip">{tip.tip}</p>
    </div>
  );
};
