export type ItemType = '교체' | '세탁';

export interface ConsumableItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  type: ItemType;
  intervalDays: number;
  lastReplacedAt: string; // ISO date string YYYY-MM-DD
  completedAt?: string; // ISO date string YYYY-MM-DD - 완료 버튼을 누른 날짜
  createdAt: string;
}

export type ItemStatus = 'ok' | 'soon' | 'due' | 'overdue' | 'completed';

export interface ItemWithStatus extends ConsumableItem {
  daysRemaining: number; // negative = overdue
  progress: number; // 0-100
  status: ItemStatus;
}

export interface PresetItem {
  name: string;
  icon: string;
  category: string;
  intervalDays: number;
}
