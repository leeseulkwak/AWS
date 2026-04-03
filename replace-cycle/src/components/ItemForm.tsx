import { useState } from 'react';
import type { ConsumableItem, ItemType } from '../types';
import { getTodayString } from '../utils/cycleUtils';

interface ItemFormProps {
  item?: ConsumableItem | null;
  defaultCategory?: string;
  defaultType?: ItemType;
  onSave: (data: Omit<ConsumableItem, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const DEFAULT_ICONS = [
  // 침실
  '🛌', '🛏️', '🌙', '🧸', '🪟', '💤', '🧣', '🪞',
  // 거실
  '🛋️', '❄️', '🌬️', '🧶', '🧹', '🌸', '📺', '💡',
  // 욕실
  '🪥', '🚿', '🛁', '🪒', '💧', '🧼', '🪣', '🚽',
  // 부엌
  '🔪', '🧻', '🧊', '🚰', '🧽', '🍳', '🥘', '🫙',
  // 자동차
  '🚗', '🛢️', '🔋', '⚙️', '🛑', '🌧️', '💨', '🔧',
  // 기타
  '🧴', '💊', '🌿', '🪴', '🐾', '📦', '🗂️', '✂️',
];

export const ItemForm = ({ item, defaultCategory = '부엌', defaultType = '교체', onSave, onClose }: ItemFormProps) => {
  const [name, setName] = useState(() => item?.name ?? '');
  const [icon, setIcon] = useState(() => item?.icon ?? '🧴');
  const [type, setType] = useState<ItemType>(() => item?.type ?? defaultType);
  const [intervalDays, setIntervalDays] = useState(() => item?.intervalDays ?? 30);
  const [lastReplacedAt, setLastReplacedAt] = useState(() => item?.lastReplacedAt ?? getTodayString());
  const [customIcon, setCustomIcon] = useState(() => item && !DEFAULT_ICONS.includes(item.icon) ? item.icon : '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    if (intervalDays < 1) {
      setError('주기는 1일 이상이어야 합니다.');
      return;
    }
    if (!lastReplacedAt) {
      setError('마지막 날짜를 입력해주세요.');
      return;
    }

    const finalIcon = customIcon.trim() || icon;
    const category = item ? item.category : defaultCategory;

    onSave({
      name: name.trim(),
      icon: finalIcon,
      category,
      type,
      intervalDays,
      lastReplacedAt,
      completedAt: item?.completedAt, // 편집 시 기존 완료 날짜 유지
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={item ? '아이템 편집' : '아이템 추가'}>
        <div className="modal__header">
          <h2 className="modal__title">{item ? '아이템 편집' : '새 아이템 추가'}</h2>
          <button className="btn-icon" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">구분</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-toggle__btn${type === '교체' ? ' type-toggle__btn--active' : ''}`}
                onClick={() => setType('교체')}
              >
                🔄 교체
              </button>
              <button
                type="button"
                className={`type-toggle__btn${type === '세탁' ? ' type-toggle__btn--active type-toggle__btn--wash' : ''}`}
                onClick={() => setType('세탁')}
              >
                👕 세탁
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="item-name">이름</label>
            <input
              id="item-name"
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 칫솔"
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">아이콘 선택</label>
            <div className="icon-picker">
              {DEFAULT_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`icon-btn ${icon === emoji && !customIcon ? 'icon-btn--selected' : ''}`}
                  onClick={() => { setIcon(emoji); setCustomIcon(''); }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <input
              className="form-input"
              type="text"
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
              placeholder="또는 직접 이모지 입력 (예: 🪴)"
              maxLength={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="item-interval">
              {type === '교체' ? '교체' : '세탁'} 주기 (일)
            </label>
            <input
              id="item-interval"
              className="form-input"
              type="number"
              value={intervalDays}
              onChange={(e) => setIntervalDays(Number(e.target.value))}
              min={1}
              max={3650}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="item-last-replaced">
              마지막 {type === '교체' ? '교체' : '세탁'}일
            </label>
            <input
              id="item-last-replaced"
              className="form-input"
              type="date"
              value={lastReplacedAt}
              onChange={(e) => setLastReplacedAt(e.target.value)}
              max={getTodayString()}
              required
            />
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn--primary">
              {item ? '저장' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
