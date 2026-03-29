import { useCallback, useEffect, useReducer } from 'react';
import type { Direction, GameState } from '../types';
import {
  addRandomTile,
  checkGameOver,
  checkWin,
  createEmptyBoard,
  moveBoard,
} from '../utils/gameLogic';

const BEST_SCORE_KEY = '2048-best-score';

const loadBestScore = (): number => {
  try {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};

const saveBestScore = (score: number): void => {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Silently ignore localStorage errors
  }
};

const initGame = (): GameState => {
  const emptyBoard = createEmptyBoard();
  const boardWithOne = addRandomTile(emptyBoard);
  const board = addRandomTile(boardWithOne);
  return {
    board,
    score: 0,
    bestScore: loadBestScore(),
    isGameOver: false,
    hasWon: false,
  };
};

type GameAction =
  | { type: 'MOVE'; direction: Direction }
  | { type: 'NEW_GAME' }
  | { type: 'CONTINUE' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'NEW_GAME':
      return initGame();

    case 'CONTINUE':
      return { ...state, hasWon: false };

    case 'MOVE': {
      if (state.isGameOver) return state;

      const { board, score, moved } = moveBoard(state.board, action.direction);
      if (!moved) return state;

      const newBoard = addRandomTile(board);
      const newScore = state.score + score;
      const newBestScore = Math.max(newScore, state.bestScore);

      if (newBestScore > state.bestScore) {
        saveBestScore(newBestScore);
      }

      const hasWon = !state.hasWon && checkWin(newBoard);
      const isGameOver = checkGameOver(newBoard);

      return {
        board: newBoard,
        score: newScore,
        bestScore: newBestScore,
        isGameOver,
        hasWon,
      };
    }

    default:
      return state;
  }
};

export interface UseGameReturn {
  gameState: GameState;
  newGame: () => void;
  continueGame: () => void;
  move: (direction: Direction) => void;
}

export const useGame = (): UseGameReturn => {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initGame);

  const newGame = useCallback(() => dispatch({ type: 'NEW_GAME' }), []);
  const continueGame = useCallback(() => dispatch({ type: 'CONTINUE' }), []);
  const move = useCallback(
    (direction: Direction) => dispatch({ type: 'MOVE', direction }),
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        W: 'up',
        s: 'down',
        S: 'down',
        a: 'left',
        A: 'left',
        d: 'right',
        D: 'right',
      };

      const direction = keyMap[event.key];
      if (direction) {
        event.preventDefault();
        move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return { gameState, newGame, continueGame, move };
};
