interface StepDisplayProps {
  steps: number;
  goal: number;
}

export const StepDisplay = ({ steps, goal }: StepDisplayProps) => {
  const isGoalReached = steps >= goal;

  return (
    <div className="step-display">
      <p className="step-label">Steps Today</p>
      <div className={`step-count ${isGoalReached ? 'goal-reached' : ''}`}>
        {steps.toLocaleString()}
      </div>
      <p className="step-goal">Goal: {goal.toLocaleString()} steps</p>
      {isGoalReached && (
        <p className="goal-message">Daily goal achieved!</p>
      )}
    </div>
  );
};
