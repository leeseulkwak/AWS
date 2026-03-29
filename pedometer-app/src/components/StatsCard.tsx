interface StatsCardProps {
  calories: number;
  distanceDisplay: string;
}

export const StatsCard = ({ calories, distanceDisplay }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="stat-item">
        <div className="stat-icon">🔥</div>
        <div className="stat-value">{calories}</div>
        <div className="stat-unit">kcal</div>
        <div className="stat-label">Calories</div>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <div className="stat-icon">📍</div>
        <div className="stat-value">{distanceDisplay}</div>
        <div className="stat-label">Distance</div>
      </div>
    </div>
  );
};
