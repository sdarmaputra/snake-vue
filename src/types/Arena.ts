export type ArenaConfig = {
  width: number;
  height: number;
};

export type SnakeConfig = {
  length: number;
};

export type GameConfig = {
  arenaConfig: ArenaConfig;
  snakeConfig: SnakeConfig;
};

export type Position = {
  x: number;
  y: number;
};

export type CellType = 'empty' | 'snake' | 'obstacle' | 'meal';

export type ArenaMatrix = CellType[][];

export type Positions = Position[];
