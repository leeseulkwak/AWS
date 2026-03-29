import type { ConsumableItem, ItemStatus, ItemWithStatus } from '../types';

export const getTodayString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year!, month! - 1, day!);
};

export const getDaysRemaining = (lastReplacedAt: string, intervalDays: number): number => {
  const last = parseLocalDate(lastReplacedAt);
  const today = parseLocalDate(getTodayString());
  const nextReplacement = new Date(last);
  nextReplacement.setDate(nextReplacement.getDate() + intervalDays);
  const diffMs = nextReplacement.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getProgress = (lastReplacedAt: string, intervalDays: number): number => {
  const last = parseLocalDate(lastReplacedAt);
  const today = parseLocalDate(getTodayString());
  const diffMs = today.getTime() - last.getTime();
  const daysPassed = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const progress = (daysPassed / intervalDays) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export const getStatus = (daysRemaining: number): ItemStatus => {
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining === 0) return 'due';
  if (daysRemaining <= 7) return 'soon';
  return 'ok';
};

export const enrichItem = (item: ConsumableItem): ItemWithStatus => {
  const daysRemaining = getDaysRemaining(item.lastReplacedAt, item.intervalDays);
  const progress = getProgress(item.lastReplacedAt, item.intervalDays);
  const status = getStatus(daysRemaining);
  return { ...item, daysRemaining, progress, status };
};
