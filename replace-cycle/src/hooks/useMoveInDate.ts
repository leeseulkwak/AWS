import { useState } from 'react';

const STORAGE_KEY = 'moveInDate';

const formatElapsed = (dateStr: string): string => {
  const moveIn = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - moveIn.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 30) return `입주한 지 ${diffDays}일 되었어요`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `입주한 지 ${diffMonths}개월 되었어요`;
  const diffYears = Math.floor(diffMonths / 12);
  const remainMonths = diffMonths % 12;
  if (remainMonths === 0) return `입주한 지 ${diffYears}년 되었어요`;
  return `입주한 지 ${diffYears}년 ${remainMonths}개월 되었어요`;
};

export const useMoveInDate = () => {
  const [moveInDate, setMoveInDateState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY),
  );

  const setMoveInDate = (date: string) => {
    localStorage.setItem(STORAGE_KEY, date);
    setMoveInDateState(date);
  };

  const elapsed = moveInDate ? formatElapsed(moveInDate) : null;

  return { moveInDate, elapsed, setMoveInDate };
};
