import { useState, type FormEvent } from 'react';

interface GoalSettingProps {
  goal: number;
  onSetGoal: (goal: number) => void;
  disabled?: boolean;
}

export const GoalSetting = ({ goal, onSetGoal, disabled = false }: GoalSettingProps) => {
  const [inputValue, setInputValue] = useState<string>(String(goal));
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(inputValue, 10);

    if (isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid positive number');
      return;
    }

    if (parsed > 100000) {
      setError('Goal cannot exceed 100,000 steps');
      return;
    }

    setError('');
    onSetGoal(parsed);
  };

  const handlePreset = (preset: number) => {
    setInputValue(String(preset));
    setError('');
    onSetGoal(preset);
  };

  return (
    <div className="goal-setting">
      <h3 className="goal-setting-title">Daily Goal</h3>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="goal-input-row">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min={1}
            max={100000}
            disabled={disabled}
            className="goal-input"
            aria-label="Daily step goal"
          />
          <button type="submit" disabled={disabled} className="goal-submit-btn">
            Set
          </button>
        </div>
        {error && <p className="goal-error">{error}</p>}
      </form>
      <div className="goal-presets">
        {[5000, 8000, 10000, 15000].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePreset(preset)}
            disabled={disabled}
            className={`goal-preset-btn ${goal === preset ? 'active' : ''}`}
          >
            {preset.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};
