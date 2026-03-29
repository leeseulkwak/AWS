import { useState } from 'react';
import type { PresetItem } from '../types';

const PRESETS: PresetItem[] = [
  { name: '칫솔', icon: '🪥', category: '구강', intervalDays: 30 },
  { name: '수건', icon: '🛁', category: '위생', intervalDays: 90 },
  { name: '에어컨 필터', icon: '🌬️', category: '가전', intervalDays: 90 },
  { name: '칫솔 헤드', icon: '🪥', category: '구강', intervalDays: 90 },
  { name: '샤워 필터', icon: '💧', category: '욕실', intervalDays: 180 },
  { name: '냉장고 필터', icon: '❄️', category: '주방', intervalDays: 180 },
  { name: '베개커버', icon: '🛌', category: '침실', intervalDays: 14 },
  { name: '면도기 날', icon: '🪒', category: '위생', intervalDays: 14 },
];

interface PresetPickerProps {
  onSelect: (presets: PresetItem[]) => void;
  onSkip: () => void;
}

export const PresetPicker = ({ onSelect, onSkip }: PresetPickerProps) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const togglePreset = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === PRESETS.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(PRESETS.map((_, i) => i)));
    }
  };

  const handleConfirm = () => {
    const chosen = PRESETS.filter((_, i) => selected.has(i));
    onSelect(chosen);
  };

  return (
    <div className="preset-picker">
      <div className="preset-picker__header">
        <h2 className="preset-picker__title">자주 쓰는 소모품을 선택하세요</h2>
        <p className="preset-picker__subtitle">나중에 언제든지 추가·수정할 수 있어요.</p>
      </div>

      <div className="preset-picker__actions-top">
        <button className="btn btn--ghost btn--sm" onClick={handleSelectAll}>
          {selected.size === PRESETS.length ? '전체 해제' : '전체 선택'}
        </button>
      </div>

      <div className="preset-list">
        {PRESETS.map((preset, index) => (
          <button
            key={`${preset.name}-${index}`}
            className={`preset-item ${selected.has(index) ? 'preset-item--selected' : ''}`}
            onClick={() => togglePreset(index)}
          >
            <span className="preset-item__icon">{preset.icon}</span>
            <div className="preset-item__info">
              <span className="preset-item__name">{preset.name}</span>
              <span className="preset-item__interval">매 {preset.intervalDays}일 교체</span>
            </div>
            <span className="preset-item__check">
              {selected.has(index) ? '✅' : '⬜'}
            </span>
          </button>
        ))}
      </div>

      <div className="preset-picker__footer">
        <button className="btn btn--ghost" onClick={onSkip}>
          건너뛰기
        </button>
        <button
          className="btn btn--primary"
          onClick={handleConfirm}
          disabled={selected.size === 0}
        >
          {selected.size > 0 ? `${selected.size}개 추가` : '항목 선택'}
        </button>
      </div>
    </div>
  );
};
