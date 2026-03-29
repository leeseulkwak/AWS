import type { FC } from 'react';
import { Board } from './components/Board';
import { GameOver } from './components/GameOver';
import { ScoreBoard } from './components/ScoreBoard';
import { useGame } from './hooks/useGame';
import './App.css';

const App: FC = () => {
  const { gameState, newGame, continueGame } = useGame();
  const { board, score, bestScore, isGameOver, hasWon } = gameState;

  return (
    <div className="app">
      <div className="game-container">
        <ScoreBoard score={score} bestScore={bestScore} onNewGame={newGame} />
        <div className="board-wrapper">
          <Board board={board} />
          <GameOver
            hasWon={hasWon}
            isGameOver={isGameOver}
            onNewGame={newGame}
            onContinue={continueGame}
          />
        </div>
        <div className="instructions">
          <p>Use arrow keys or WASD to move tiles.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
