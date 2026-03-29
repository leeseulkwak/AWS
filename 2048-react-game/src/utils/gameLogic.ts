import type { Board, Direction } from '../types';

const BOARD_SIZE = 4;

export const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

export const getEmptyCells = (board: Board): Array<[number, number]> => {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) {
        cells.push([r, c]);
      }
    }
  }
  return cells;
};

export const addRandomTile = (board: Board): Board => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return board;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const [row, col] = emptyCells[randomIndex];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = newValue;
  return newBoard;
};

const slideRow = (row: number[]): { row: number[]; score: number } => {
  // Filter out zeroes
  const filtered = row.filter((val) => val !== 0);
  let score = 0;

  // Merge adjacent equal tiles
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }

  // Pad with zeroes to maintain row length
  while (filtered.length < BOARD_SIZE) {
    filtered.push(0);
  }

  return { row: filtered, score };
};

const rotateBoard = (board: Board): Board =>
  board[0].map((_, colIndex) => board.map((row) => row[colIndex]).reverse());

const rotateBoardCounterClockwise = (board: Board): Board =>
  board[0].map((_, colIndex) =>
    board.map((row) => row[BOARD_SIZE - 1 - colIndex])
  );

export const moveBoard = (
  board: Board,
  direction: Direction
): { board: Board; score: number; moved: boolean } => {
  let workingBoard: Board;

  // Normalize to "left" movement via rotation
  switch (direction) {
    case 'left':
      workingBoard = board.map((r) => [...r]);
      break;
    case 'right':
      workingBoard = board.map((r) => [...r].reverse());
      break;
    case 'up':
      workingBoard = rotateBoardCounterClockwise(board);
      break;
    case 'down':
      workingBoard = rotateBoard(board);
      break;
  }

  let totalScore = 0;
  const movedBoard = workingBoard.map((row) => {
    const { row: newRow, score } = slideRow(row);
    totalScore += score;
    return newRow;
  });

  // Rotate back
  let resultBoard: Board;
  switch (direction) {
    case 'left':
      resultBoard = movedBoard;
      break;
    case 'right':
      resultBoard = movedBoard.map((r) => [...r].reverse());
      break;
    case 'up':
      resultBoard = rotateBoard(movedBoard);
      break;
    case 'down':
      resultBoard = rotateBoardCounterClockwise(movedBoard);
      break;
  }

  // Check if board actually moved
  const moved = resultBoard.some((row, r) =>
    row.some((cell, c) => cell !== board[r][c])
  );

  return { board: resultBoard, score: totalScore, moved };
};

export const checkGameOver = (board: Board): boolean => {
  // If there are empty cells, game is not over
  if (getEmptyCells(board).length > 0) return false;

  // Check if any adjacent tiles can merge
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const current = board[r][c];
      if (c + 1 < BOARD_SIZE && board[r][c + 1] === current) return false;
      if (r + 1 < BOARD_SIZE && board[r + 1][c] === current) return false;
    }
  }

  return true;
};

export const checkWin = (board: Board): boolean =>
  board.some((row) => row.some((cell) => cell >= 2048));
