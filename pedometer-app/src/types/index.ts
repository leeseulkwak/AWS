export interface PedometerState {
  steps: number;
  goal: number;
  isRunning: boolean;
  isSupported: boolean;
  permissionGranted: boolean | null;
  date: string;
}

export interface PedometerStats {
  calories: number;
  distanceMeters: number;
  distanceDisplay: string;
  progress: number;
}

export interface AccelerationData {
  x: number;
  y: number;
  z: number;
}

export interface StoredData {
  steps: number;
  goal: number;
  date: string;
}

export type PermissionState = 'granted' | 'denied' | 'prompt' | null;
