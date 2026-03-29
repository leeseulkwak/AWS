import type { AccelerationData, PedometerStats } from '../types';

export const STEP_THRESHOLD = 11.5;
export const MIN_STEP_INTERVAL_MS = 300;
export const LOW_PASS_ALPHA = 0.1;
export const CALORIES_PER_STEP = 0.04;
export const METERS_PER_STEP = 0.762;

/**
 * Calculates the magnitude of a 3D acceleration vector.
 */
export const calculateMagnitude = ({ x, y, z }: AccelerationData): number => {
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Applies a low-pass filter to smooth acceleration data.
 * filtered = alpha * current + (1 - alpha) * previous
 */
export const applyLowPassFilter = (
  current: number,
  previous: number,
  alpha: number = LOW_PASS_ALPHA
): number => {
  return alpha * current + (1 - alpha) * previous;
};

/**
 * Detects if a step has occurred based on magnitude, threshold, and time constraints.
 */
export const detectStep = (
  magnitude: number,
  lastStepTime: number,
  currentTime: number,
  threshold: number = STEP_THRESHOLD,
  minInterval: number = MIN_STEP_INTERVAL_MS
): boolean => {
  if (magnitude < threshold) return false;
  if (currentTime - lastStepTime < minInterval) return false;
  return true;
};

/**
 * Calculates calories burned from step count.
 */
export const calculateCalories = (steps: number): number => {
  return Math.round(steps * CALORIES_PER_STEP * 10) / 10;
};

/**
 * Calculates distance in meters from step count.
 */
export const calculateDistanceMeters = (steps: number): number => {
  return Math.round(steps * METERS_PER_STEP * 10) / 10;
};

/**
 * Formats distance for display: meters if < 1000m, km otherwise.
 */
export const formatDistance = (meters: number): string => {
  if (meters >= 1000) {
    const km = meters / 1000;
    return `${km.toFixed(2)} km`;
  }
  return `${meters.toFixed(0)} m`;
};

/**
 * Calculates progress percentage toward goal (capped at 100%).
 */
export const calculateProgress = (steps: number, goal: number): number => {
  if (goal <= 0) return 0;
  return Math.min(Math.round((steps / goal) * 100), 100);
};

/**
 * Computes all pedometer stats from current steps and goal.
 */
export const computeStats = (steps: number, goal: number): PedometerStats => {
  const calories = calculateCalories(steps);
  const distanceMeters = calculateDistanceMeters(steps);
  const distanceDisplay = formatDistance(distanceMeters);
  const progress = calculateProgress(steps, goal);

  return { calories, distanceMeters, distanceDisplay, progress };
};

/**
 * Returns today's date as a YYYY-MM-DD string.
 */
export const getTodayString = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};
