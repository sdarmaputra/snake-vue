<template>
  <GameArena
    :config="gameConfig.arenaConfig"
    :meal-positions="mealPositions"
    :snake-positions="snakePositions"
    @eat="eat"
  />
  <GameControls @set-direction="setDirection" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameArena from './components/GameArena.vue';
import GameControls from './components/GameControls.vue';
import { gameConfig, initialSnakePositions } from './configs';
import {
  Positions,
  Position,
} from './types/Arena';
import { Direction } from './types/Control';
import changeDirection from './utils/change-direction';
import moveSnake from './utils/move-snake';
import randomizeMealPosition from './utils/randomize-meal-position';

export default defineComponent({
  name: 'App',

  components: {
    GameArena,
    GameControls,
  },

  data() {
    return {
      gameConfig,
      direction: 'right' as Direction,
      movementInterval: undefined as number | undefined,
      mealPositions: [] as Positions,
      snakePositions: initialSnakePositions,
    };
  },

  mounted() {
    this.startGame();
  },

  methods: {
    startGame() {
      this.initiateMealPositions();
      this.startSnakeMovement();
    },

    initiateMealPositions() {
      this.mealPositions = Array(3).fill(null).map((value, index) => (
        randomizeMealPosition(this.gameConfig.arenaConfig, index + 1)
      ));
      console.log(this.mealPositions);
    },

    startSnakeMovement() {
      this.movementInterval = setInterval(() => {
        try {
          this.snakePositions = moveSnake(this.snakePositions, this.direction, this.gameConfig);
        } catch (error) {
          this.stopSnakeMovement();
          alert(error.message);
        }
      }, 300);
    },

    stopSnakeMovement() {
      clearInterval(this.movementInterval);
      this.movementInterval = undefined;
    },

    setDirection(direction: Direction) {
      this.direction = changeDirection(direction, this.direction);
    },

    eat(eatenMealPosition: Position) {
      this.mealPositions = [
        ...this.mealPositions.filter(({ x, y }) => (
          !(x === eatenMealPosition.x && y === eatenMealPosition.y)
        )),
        randomizeMealPosition(this.gameConfig.arenaConfig),
      ];
      this.gameConfig.snakeConfig.length += 1;
    },
  },
});
</script>
