import type { FC } from 'react';

interface TileProps {
  value: number;
}

const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  };
  return colors[value] ?? '#3c3a32';
};

const getTextColor = (value: number): string =>
  value <= 4 ? '#776e65' : '#f9f6f2';

const getFontSize = (value: number): string => {
  if (value >= 1024) return '1.4rem';
  if (value >= 128) return '1.8rem';
  return '2.2rem';
};

export const Tile: FC<TileProps> = ({ value }) => {
  const bgColor = getTileColor(value);
  const textColor = getTextColor(value);
  const fontSize = getFontSize(value);

  return (
    <div
      className={`tile ${value > 0 ? `tile-${value}` : ''}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize,
      }}
    >
      {value > 0 && <span>{value}</span>}
    </div>
  );
};
