import type { FC } from 'react';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  score,
  bestScore,
  onNewGame,
}) => (
  <div className="header">
    <div className="title-row">
      <h1 className="game-title">2048</h1>
      <div className="scores">
        <div className="score-box">
          <span className="score-label">SCORE</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-box">
          <span className="score-label">BEST</span>
          <span className="score-value">{bestScore}</span>
        </div>
      </div>
    </div>
    <div className="subtitle-row">
      <p className="subtitle">
        Join tiles to get to <strong>2048!</strong>
      </p>
      <button className="new-game-btn" onClick={onNewGame} type="button">
        New Game
      </button>
    </div>
  </div>
);
