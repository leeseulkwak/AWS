import type { FC } from 'react';

interface GameOverProps {
  hasWon: boolean;
  isGameOver: boolean;
  onNewGame: () => void;
  onContinue: () => void;
}

export const GameOver: FC<GameOverProps> = ({
  hasWon,
  isGameOver,
  onNewGame,
  onContinue,
}) => {
  if (!hasWon && !isGameOver) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        {hasWon ? (
          <>
            <h2 className="overlay-title won">You Win!</h2>
            <p className="overlay-message">You reached 2048!</p>
            <div className="overlay-buttons">
              <button
                className="overlay-btn continue-btn"
                onClick={onContinue}
                type="button"
              >
                Keep Going
              </button>
              <button
                className="overlay-btn new-game-btn"
                onClick={onNewGame}
                type="button"
              >
                New Game
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="overlay-title lost">Game Over!</h2>
            <p className="overlay-message">No more moves available.</p>
            <button
              className="overlay-btn new-game-btn"
              onClick={onNewGame}
              type="button"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};
