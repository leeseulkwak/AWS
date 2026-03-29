import type { FC } from 'react';
import type { Board as BoardType } from '../types';
import { Tile } from './Tile';

interface BoardProps {
  board: BoardType;
}

export const Board: FC<BoardProps> = ({ board }) => (
  <div className="board">
    <div className="board-grid">
      {/* Background cells */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="cell-bg" />
      ))}
    </div>
    <div className="tiles-container">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="tile-wrapper"
            style={{
              transform: `translate(${colIndex * 110 + 15}px, ${rowIndex * 110 + 15}px)`,
            }}
          >
            <Tile value={value} />
          </div>
        ))
      )}
    </div>
  </div>
);
