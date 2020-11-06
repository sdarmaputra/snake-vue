import { mount } from '@vue/test-utils';
import GameArena from './GameArena.vue';

describe('when rendered', () => {
  it('should render 32 rows by default', async () => {
    const $target = await mount(GameArena);
    const $rows = $target.findAll('.arena__row');

    expect($rows.length).toBe(32);
  });

  it('should render 32 empty columns by default', async () => {
    const $target = await mount(GameArena);
    const $rows = $target.findAll('.arena__row');

    for (let rowIndex = 0; rowIndex < $rows.length; rowIndex += 1) {
      const $cols = $rows[rowIndex].findAll('.arena__cell');
      expect($cols.length).toBe(32);

      for (let colIndex = 0; colIndex < $cols.length; colIndex += 1) {
        expect($cols[colIndex].classes('arena__empty')).toBe(true);
      }
    }
  });
});

describe('props', () => {
  describe('when config is provided', () => {
    const arenaConfig = {
      width: 8,
      height: 8,
    };
    const options = {
      propsData: {
        config: arenaConfig,
      },
    };

    it('should render rows as much as config.height', async () => {
      const $target = await mount(GameArena, options);
      const $rows = $target.findAll('.arena__row');

      expect($rows.length).toBe(arenaConfig.height);
    });

    it('should render columns as much as config.width', async () => {
      const $target = await mount(GameArena, options);
      const $rows = $target.findAll('.arena__row');

      for (let rowIndex = 0; rowIndex < $rows.length; rowIndex += 1) {
        const $cols = $rows[rowIndex].findAll('.arena__cell');
        expect($cols.length).toBe(arenaConfig.width);
      }
    });
  });

  describe('when snakePositions is provided', () => {
    const arenaConfig = {
      width: 8,
      height: 8,
    };
    const snakePositions = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ];
    const options = {
      propsData: {
        snakePositions,
        config: arenaConfig,
      },
    };

    it('should render snake cell within defined positions', async () => {
      const $target = await mount(GameArena, options);
      const $rows = $target.findAll('.arena__row');

      expect($rows[1].findAll('.arena__cell')[1].classes('arena__snake')).toBe(true);
      expect($rows[1].findAll('.arena__cell')[2].classes('arena__snake')).toBe(true);
      expect($rows[1].findAll('.arena__cell')[3].classes('arena__snake')).toBe(true);
    });
  });

  describe('when mealPositions is provided', () => {
    const arenaConfig = {
      width: 8,
      height: 8,
    };
    const mealPositions = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ];
    const options = {
      propsData: {
        mealPositions,
        config: arenaConfig,
      },
    };

    it('should render meal cell within defined positions', async () => {
      const $target = await mount(GameArena, options);
      const $rows = $target.findAll('.arena__row');

      expect($rows[1].findAll('.arena__cell')[1].classes('arena__meal')).toBe(true);
      expect($rows[1].findAll('.arena__cell')[2].classes('arena__meal')).toBe(true);
      expect($rows[1].findAll('.arena__cell')[3].classes('arena__meal')).toBe(true);
    });
  });
});
