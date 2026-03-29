interface ProgressBarProps {
  progress: number;
  steps: number;
  goal: number;
}

export const ProgressBar = ({ progress, steps, goal }: ProgressBarProps) => {
  const remaining = Math.max(goal - steps, 0);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-label">Progress</span>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="progress-remaining">
        {remaining > 0
          ? `${remaining.toLocaleString()} steps remaining`
          : 'Goal complete!'}
      </p>
    </div>
  );
};
