import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  calculateMagnitude,
  applyLowPassFilter,
  detectStep,
  computeStats,
  getTodayString,
} from '../utils/pedometerUtils';
import type { StoredData, PedometerStats, PermissionState } from '../types';

const STORAGE_KEY = 'pedometer_data';
const DEFAULT_GOAL = 10000;

interface UsePedometerReturn {
  steps: number;
  goal: number;
  isRunning: boolean;
  isSupported: boolean;
  isDemoMode: boolean;
  permissionState: PermissionState;
  stats: PedometerStats;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
  setGoal: (goal: number) => void;
  requestPermission: () => Promise<void>;
  toggleDemoMode: () => void;
  addStep: () => void;
}

export const usePedometer = (): UsePedometerReturn => {
  const todayString = getTodayString();

  const [storedData, setStoredData] = useLocalStorage<StoredData>(STORAGE_KEY, {
    steps: 0,
    goal: DEFAULT_GOAL,
    date: todayString,
  });

  // Reset steps if it's a new day
  const initialSteps = storedData.date === todayString ? storedData.steps : 0;
  const [steps, setSteps] = useState<number>(initialSteps);
  const [goal, setGoalState] = useState<number>(storedData.goal);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [permissionState, setPermissionState] = useState<PermissionState>(null);

  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const filteredMagnitudeRef = useRef<number>(0);
  const lastStepTimeRef = useRef<number>(0);
  const listenerRef = useRef<((event: DeviceMotionEvent) => void) | null>(null);

  // Check if DeviceMotionEvent is supported
  const isSupported = typeof DeviceMotionEvent !== 'undefined';

  // Persist steps and goal to localStorage whenever they change
  useEffect(() => {
    setStoredData({ steps, goal, date: todayString });
  }, [steps, goal, todayString, setStoredData]);

  // Reset on new day
  useEffect(() => {
    if (storedData.date !== todayString) {
      setSteps(0);
    }
  }, [todayString, storedData.date]);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x ?? 0;
    const y = acc.y ?? 0;
    const z = acc.z ?? 0;

    const magnitude = calculateMagnitude({ x, y, z });
    const filtered = applyLowPassFilter(magnitude, filteredMagnitudeRef.current);
    filteredMagnitudeRef.current = filtered;

    const now = Date.now();
    if (detectStep(filtered, lastStepTimeRef.current, now)) {
      lastStepTimeRef.current = now;
      setSteps((prev) => prev + 1);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      // iOS 13+ requires explicit permission for DeviceMotionEvent
      type DeviceMotionEventWithPermission = typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;

      if (typeof DME.requestPermission === 'function') {
        const result = await DME.requestPermission();
        setPermissionState(result);
      } else {
        // Non-iOS: permission not required
        setPermissionState('granted');
      }
    } catch (error) {
      console.error('Error requesting DeviceMotion permission:', error);
      setPermissionState('denied');
    }
  }, []);

  const start = useCallback(async () => {
    if (!isSupported) return;

    try {
      // Request permission if needed (iOS)
      type DeviceMotionEventWithPermission = typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      const DME = DeviceMotionEvent as DeviceMotionEventWithPermission;

      if (typeof DME.requestPermission === 'function') {
        const result = await DME.requestPermission();
        setPermissionState(result);
        if (result !== 'granted') return;
      } else {
        setPermissionState('granted');
      }

      if (listenerRef.current) {
        window.removeEventListener('devicemotion', listenerRef.current);
      }

      listenerRef.current = handleMotion;
      window.addEventListener('devicemotion', listenerRef.current);
      setIsRunning(true);
    } catch (error) {
      console.error('Error starting pedometer:', error);
      setPermissionState('denied');
    }
  }, [isSupported, handleMotion]);

  const stop = useCallback(() => {
    if (listenerRef.current) {
      window.removeEventListener('devicemotion', listenerRef.current);
      listenerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setSteps(0);
    filteredMagnitudeRef.current = 0;
    lastStepTimeRef.current = 0;
  }, [stop]);

  const setGoal = useCallback((newGoal: number) => {
    setGoalState(newGoal);
  }, []);

  const addStep = useCallback(() => {
    setSteps((prev) => prev + 1);
  }, []);

  const toggleDemoMode = useCallback(() => {
    setIsDemoMode((prev) => !prev);
  }, []);

  // Spacebar adds a step in demo mode
  useEffect(() => {
    if (!isDemoMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setSteps((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (listenerRef.current) {
        window.removeEventListener('devicemotion', listenerRef.current);
      }
    };
  }, []);

  const stats = computeStats(steps, goal);

  return {
    steps,
    goal,
    isRunning,
    isSupported,
    isDemoMode,
    permissionState,
    stats,
    start,
    stop,
    reset,
    setGoal,
    requestPermission,
    toggleDemoMode,
    addStep,
  };
};
