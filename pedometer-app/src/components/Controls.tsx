interface ControlsProps {
  isRunning: boolean;
  isSupported: boolean;
  isDemoMode: boolean;
  permissionState: string | null;
  onStart: () => Promise<void>;
  onStop: () => void;
  onReset: () => void;
  onRequestPermission: () => Promise<void>;
  onToggleDemoMode: () => void;
  onAddStep: () => void;
}

export const Controls = ({
  isRunning,
  isSupported,
  isDemoMode,
  permissionState,
  onStart,
  onStop,
  onReset,
  onRequestPermission,
  onToggleDemoMode,
  onAddStep,
}: ControlsProps) => {
  const needsPermission = permissionState === null || permissionState === 'prompt';

  return (
    <div className="controls">
      {/* Demo mode toggle */}
      <button
        className={`control-btn demo-toggle-btn ${isDemoMode ? 'active' : ''}`}
        onClick={onToggleDemoMode}
        type="button"
      >
        {isDemoMode ? 'Demo Mode ON' : 'Demo Mode (PC)'}
      </button>

      {isDemoMode ? (
        <div className="demo-section">
          <button
            className="control-btn demo-step-btn"
            onClick={onAddStep}
            type="button"
          >
            👟 탭하여 걸음 추가
          </button>
          <p className="demo-hint">스페이스바로도 걸음을 추가할 수 있습니다</p>
          <button
            className="control-btn reset-btn"
            onClick={onReset}
            type="button"
          >
            Reset
          </button>
        </div>
      ) : (
        <>
          {!isSupported && (
            <p className="controls-unsupported">
              DeviceMotion is not supported on this device or browser.
            </p>
          )}
          {isSupported && needsPermission && !isRunning && (
            <button
              className="control-btn permission-btn"
              onClick={onRequestPermission}
              type="button"
            >
              Grant Motion Permission
            </button>
          )}
          {isSupported && permissionState === 'denied' && (
            <p className="permission-denied">
              Motion permission denied. Please enable it in your device settings.
            </p>
          )}
          <div className="control-buttons">
            {!isRunning ? (
              <button
                className="control-btn start-btn"
                onClick={onStart}
                disabled={!isSupported || permissionState === 'denied'}
                type="button"
              >
                Start
              </button>
            ) : (
              <button
                className="control-btn stop-btn"
                onClick={onStop}
                type="button"
              >
                Stop
              </button>
            )}
            <button
              className="control-btn reset-btn"
              onClick={onReset}
              type="button"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
