export type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;
export type Direction = 'up' | 'down' | 'left' | 'right';
export type Board = number[][];

export interface GameState {
  board: Board;
  score: number;
  bestScore: number;
  isGameOver: boolean;
  hasWon: boolean;
}
