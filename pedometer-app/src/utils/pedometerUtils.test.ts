import { describe, it, expect } from 'vitest';
import {
  calculateMagnitude,
  applyLowPassFilter,
  detectStep,
  calculateCalories,
  calculateDistanceMeters,
  formatDistance,
  calculateProgress,
  computeStats,
  STEP_THRESHOLD,
  MIN_STEP_INTERVAL_MS,
  LOW_PASS_ALPHA,
} from './pedometerUtils';

describe('calculateMagnitude', () => {
  it('calculates magnitude of a 3D vector', () => {
    expect(calculateMagnitude({ x: 3, y: 4, z: 0 })).toBe(5);
  });

  it('returns 0 for zero vector', () => {
    expect(calculateMagnitude({ x: 0, y: 0, z: 0 })).toBe(0);
  });

  it('handles negative values correctly', () => {
    expect(calculateMagnitude({ x: -3, y: 4, z: 0 })).toBe(5);
  });

  it('calculates 3D magnitude correctly', () => {
    const result = calculateMagnitude({ x: 1, y: 2, z: 2 });
    expect(result).toBeCloseTo(3, 5);
  });
});

describe('applyLowPassFilter', () => {
  it('applies low-pass filter with default alpha', () => {
    const result = applyLowPassFilter(10, 5);
    expect(result).toBeCloseTo(LOW_PASS_ALPHA * 10 + (1 - LOW_PASS_ALPHA) * 5, 5);
  });

  it('returns current value when alpha is 1', () => {
    expect(applyLowPassFilter(10, 5, 1)).toBe(10);
  });

  it('returns previous value when alpha is 0', () => {
    expect(applyLowPassFilter(10, 5, 0)).toBe(5);
  });

  it('handles equal current and previous', () => {
    expect(applyLowPassFilter(7, 7)).toBe(7);
  });
});

describe('detectStep', () => {
  it('detects a step when magnitude exceeds threshold and enough time has passed', () => {
    expect(detectStep(12, 0, MIN_STEP_INTERVAL_MS + 1)).toBe(true);
  });

  it('does not detect step when magnitude is below threshold', () => {
    expect(detectStep(10, 0, MIN_STEP_INTERVAL_MS + 1)).toBe(false);
  });

  it('does not detect step when time interval is too short', () => {
    expect(detectStep(STEP_THRESHOLD + 1, 1000, 1100)).toBe(false);
  });

  it('detects step exactly at threshold magnitude', () => {
    expect(detectStep(STEP_THRESHOLD, 0, MIN_STEP_INTERVAL_MS + 1)).toBe(true);
  });

  it('detects step exactly at minimum interval boundary (boundary is inclusive)', () => {
    // currentTime - lastStepTime === MIN_STEP_INTERVAL_MS → not less than → step allowed
    expect(detectStep(STEP_THRESHOLD + 1, 1000, 1000 + MIN_STEP_INTERVAL_MS)).toBe(true);
  });

  it('detects step when there has been no previous step (lastStepTime = 0)', () => {
    expect(detectStep(15, 0, 1000)).toBe(true);
  });
});

describe('calculateCalories', () => {
  it('returns 0 for 0 steps', () => {
    expect(calculateCalories(0)).toBe(0);
  });

  it('calculates calories for 100 steps', () => {
    expect(calculateCalories(100)).toBe(4);
  });

  it('calculates calories for 10000 steps', () => {
    expect(calculateCalories(10000)).toBe(400);
  });

  it('rounds to 1 decimal place', () => {
    expect(calculateCalories(1)).toBe(0);
    expect(calculateCalories(3)).toBe(0.1);
  });
});

describe('calculateDistanceMeters', () => {
  it('returns 0 for 0 steps', () => {
    expect(calculateDistanceMeters(0)).toBe(0);
  });

  it('calculates distance for 1000 steps', () => {
    expect(calculateDistanceMeters(1000)).toBe(762);
  });

  it('rounds to 1 decimal place', () => {
    const result = calculateDistanceMeters(1);
    expect(result).toBe(0.8);
  });
});

describe('formatDistance', () => {
  it('formats distance in meters when below 1000', () => {
    expect(formatDistance(500)).toBe('500 m');
  });

  it('formats distance in km when >= 1000', () => {
    expect(formatDistance(1000)).toBe('1.00 km');
  });

  it('formats distance in km with two decimal places', () => {
    expect(formatDistance(1500)).toBe('1.50 km');
  });

  it('formats 0 meters', () => {
    expect(formatDistance(0)).toBe('0 m');
  });

  it('formats 999.9 meters as meters', () => {
    expect(formatDistance(999.9)).toBe('1000 m');
  });
});

describe('calculateProgress', () => {
  it('returns 0 when steps is 0', () => {
    expect(calculateProgress(0, 10000)).toBe(0);
  });

  it('returns 100 when steps equals goal', () => {
    expect(calculateProgress(10000, 10000)).toBe(100);
  });

  it('caps at 100 when steps exceeds goal', () => {
    expect(calculateProgress(15000, 10000)).toBe(100);
  });

  it('calculates percentage correctly', () => {
    expect(calculateProgress(5000, 10000)).toBe(50);
  });

  it('returns 0 when goal is 0', () => {
    expect(calculateProgress(100, 0)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calculateProgress(1, 3)).toBe(33);
  });
});

describe('computeStats', () => {
  it('computes all stats correctly for 0 steps', () => {
    const stats = computeStats(0, 10000);
    expect(stats.calories).toBe(0);
    expect(stats.distanceMeters).toBe(0);
    expect(stats.distanceDisplay).toBe('0 m');
    expect(stats.progress).toBe(0);
  });

  it('computes all stats correctly for 10000 steps', () => {
    const stats = computeStats(10000, 10000);
    expect(stats.calories).toBe(400);
    expect(stats.distanceMeters).toBe(7620);
    expect(stats.distanceDisplay).toBe('7.62 km');
    expect(stats.progress).toBe(100);
  });

  it('shows distance in km when distance >= 1000m', () => {
    const stats = computeStats(2000, 10000);
    expect(stats.distanceDisplay).toContain('km');
  });

  it('shows distance in meters when distance < 1000m', () => {
    const stats = computeStats(100, 10000);
    expect(stats.distanceDisplay).toContain('m');
    expect(stats.distanceDisplay).not.toContain('km');
  });
});
