import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTodayString,
  getDaysRemaining,
  getProgress,
  getStatus,
  enrichItem,
} from './cycleUtils';
import type { ConsumableItem } from '../types';

describe('getTodayString', () => {
  it('returns a string in YYYY-MM-DD format', () => {
    const result = getTodayString();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('reflects mocked date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-27T12:00:00'));
    expect(getTodayString()).toBe('2026-03-27');
    vi.useRealTimers();
  });
});

describe('getDaysRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-27T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns positive days when replacement is in the future', () => {
    // replaced 20 days ago, interval 30 -> 10 days remaining
    const result = getDaysRemaining('2026-03-07', 30);
    expect(result).toBe(10);
  });

  it('returns 0 when due today', () => {
    // replaced 30 days ago, interval 30
    const result = getDaysRemaining('2026-02-25', 30);
    expect(result).toBe(0);
  });

  it('returns negative when overdue', () => {
    // replaced 40 days ago, interval 30 -> -10
    const result = getDaysRemaining('2026-02-15', 30);
    expect(result).toBe(-10);
  });

  it('returns full interval when replaced today', () => {
    const result = getDaysRemaining('2026-03-27', 30);
    expect(result).toBe(30);
  });
});

describe('getProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-27T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 when replaced today', () => {
    expect(getProgress('2026-03-27', 30)).toBe(0);
  });

  it('returns 50 at halfway through interval', () => {
    // 15 days into a 30-day cycle
    expect(getProgress('2026-03-12', 30)).toBeCloseTo(50);
  });

  it('returns 100 when at or past due date', () => {
    expect(getProgress('2026-01-01', 30)).toBe(100);
  });

  it('caps at 100 even when overdue', () => {
    const result = getProgress('2025-01-01', 30);
    expect(result).toBe(100);
  });
});

describe('getStatus', () => {
  it('returns overdue for negative days', () => {
    expect(getStatus(-1)).toBe('overdue');
    expect(getStatus(-100)).toBe('overdue');
  });

  it('returns due for 0 days', () => {
    expect(getStatus(0)).toBe('due');
  });

  it('returns soon for 1-7 days', () => {
    expect(getStatus(1)).toBe('soon');
    expect(getStatus(7)).toBe('soon');
  });

  it('returns ok for more than 7 days', () => {
    expect(getStatus(8)).toBe('ok');
    expect(getStatus(100)).toBe('ok');
  });
});

describe('enrichItem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-27T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseItem: ConsumableItem = {
    id: '1',
    name: '칫솔',
    icon: '🪥',
    category: '구강',
    intervalDays: 30,
    lastReplacedAt: '2026-03-07',
    createdAt: '2026-01-01',
  };

  it('returns item with status fields', () => {
    const enriched = enrichItem(baseItem);
    expect(enriched.id).toBe('1');
    expect(enriched.daysRemaining).toBe(10);
    expect(enriched.status).toBe('ok');
    expect(enriched.progress).toBeCloseTo(66.67, 0);
  });

  it('computes overdue status', () => {
    const overdueItem: ConsumableItem = { ...baseItem, lastReplacedAt: '2026-01-01' };
    const enriched = enrichItem(overdueItem);
    expect(enriched.status).toBe('overdue');
    expect(enriched.daysRemaining).toBeLessThan(0);
    expect(enriched.progress).toBe(100);
  });
});
