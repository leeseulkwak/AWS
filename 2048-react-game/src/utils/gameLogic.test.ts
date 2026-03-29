import { describe, expect, it } from 'vitest';
import {
  addRandomTile,
  checkGameOver,
  checkWin,
  createEmptyBoard,
  getEmptyCells,
  moveBoard,
} from './gameLogic';

describe('createEmptyBoard', () => {
  it('creates a 4x4 board', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(4);
    board.forEach((row) => expect(row).toHaveLength(4));
  });

  it('fills board with zeros', () => {
    const board = createEmptyBoard();
    board.forEach((row) => row.forEach((cell) => expect(cell).toBe(0)));
  });
});

describe('addRandomTile', () => {
  it('adds exactly one tile to an empty board', () => {
    const board = createEmptyBoard();
    const newBoard = addRandomTile(board);
    const nonZeroCells = newBoard.flat().filter((v) => v !== 0);
    expect(nonZeroCells).toHaveLength(1);
  });

  it('adds a tile with value 2 or 4', () => {
    const board = createEmptyBoard();
    const newBoard = addRandomTile(board);
    const values = newBoard.flat().filter((v) => v !== 0);
    expect([2, 4]).toContain(values[0]);
  });

  it('does not modify the original board', () => {
    const board = createEmptyBoard();
    addRandomTile(board);
    // original board should still be all zeros
    board.forEach((row) => row.forEach((cell) => expect(cell).toBe(0)));
  });

  it('returns the same board when no empty cells exist', () => {
    const fullBoard = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 32],
    ];
    const result = addRandomTile(fullBoard);
    expect(result).toBe(fullBoard);
  });
});

describe('getEmptyCells', () => {
  it('returns all cells for empty board', () => {
    const board = createEmptyBoard();
    const cells = getEmptyCells(board);
    expect(cells).toHaveLength(16);
  });

  it('returns empty array when board is full', () => {
    const fullBoard = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 32],
    ];
    expect(getEmptyCells(fullBoard)).toHaveLength(0);
  });
});

describe('moveBoard - left', () => {
  it('slides tiles to the left', () => {
    const board = [
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, moved } = moveBoard(board, 'left');
    expect(result[0][0]).toBe(2);
    expect(moved).toBe(true);
  });

  it('merges equal tiles moving left', () => {
    const board = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, score } = moveBoard(board, 'left');
    expect(result[0][0]).toBe(4);
    expect(result[0][1]).toBe(0);
    expect(score).toBe(4);
  });

  it('does not merge three tiles into one (only first pair merges)', () => {
    const board = [
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result } = moveBoard(board, 'left');
    expect(result[0][0]).toBe(4);
    expect(result[0][1]).toBe(2);
    expect(result[0][2]).toBe(0);
  });

  it('reports moved=false when nothing can move', () => {
    const board = [
      [2, 4, 8, 16],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { moved } = moveBoard(board, 'left');
    expect(moved).toBe(false);
  });
});

describe('moveBoard - right', () => {
  it('slides tiles to the right', () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, moved } = moveBoard(board, 'right');
    expect(result[0][3]).toBe(2);
    expect(moved).toBe(true);
  });

  it('merges equal tiles moving right', () => {
    const board = [
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, score } = moveBoard(board, 'right');
    expect(result[0][3]).toBe(4);
    expect(score).toBe(4);
  });
});

describe('moveBoard - up', () => {
  it('slides tiles upward', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
    ];
    const { board: result, moved } = moveBoard(board, 'up');
    expect(result[0][0]).toBe(2);
    expect(moved).toBe(true);
  });

  it('merges equal tiles moving up', () => {
    const board = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, score } = moveBoard(board, 'up');
    expect(result[0][0]).toBe(4);
    expect(result[1][0]).toBe(0);
    expect(score).toBe(4);
  });
});

describe('moveBoard - down', () => {
  it('slides tiles downward', () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { board: result, moved } = moveBoard(board, 'down');
    expect(result[3][0]).toBe(2);
    expect(moved).toBe(true);
  });

  it('merges equal tiles moving down', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ];
    const { board: result, score } = moveBoard(board, 'down');
    expect(result[3][0]).toBe(4);
    expect(result[2][0]).toBe(0);
    expect(score).toBe(4);
  });
});

describe('checkGameOver', () => {
  it('returns false for empty board', () => {
    expect(checkGameOver(createEmptyBoard())).toBe(false);
  });

  it('returns false when there are empty cells', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 0],
    ];
    expect(checkGameOver(board)).toBe(false);
  });

  it('returns false when adjacent equal tiles exist', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 2],
    ];
    expect(checkGameOver(board)).toBe(false);
  });

  it('returns true when no moves are possible', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4],
      [4, 8, 16, 2],
    ];
    expect(checkGameOver(board)).toBe(true);
  });
});

describe('checkWin', () => {
  it('returns false for an empty board', () => {
    expect(checkWin(createEmptyBoard())).toBe(false);
  });

  it('returns false when no tile equals 2048', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 4, 2],
      [4, 8, 16, 32],
    ];
    expect(checkWin(board)).toBe(false);
  });

  it('returns true when a tile equals 2048', () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 32],
    ];
    expect(checkWin(board)).toBe(true);
  });
});
