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
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from 'vue';
import GameArena from './components/GameArena';
import GameControls from './components/GameControls';
import { initialGameConfig, initialSnakePositions } from './configs';
import {
  GameConfig,
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

  setup() {
    const gameConfig = reactive<GameConfig>(initialGameConfig);
    const direction = ref<Direction>('right');
    const movementInterval = ref<number | undefined>(undefined);
    const mealPositions = ref<Positions>([]);
    const snakePositions = ref<Positions>(initialSnakePositions);

    function setDirection(newDirection: Direction): void {
      direction.value = changeDirection(newDirection, direction.value);
    }

    function eat(eatenMealPosition: Position): void {
      mealPositions.value = [
        ...mealPositions.value.filter(({ x, y }) => (
          !(x === eatenMealPosition.x && y === eatenMealPosition.y)
        )),
        randomizeMealPosition(gameConfig.arenaConfig),
      ];
      gameConfig.snakeConfig.length += 1;
    }

    function stopSnakeMovement(): void {
      clearInterval(movementInterval.value);
      movementInterval.value = undefined;
    }

    function initiateMealPositions(): void {
      mealPositions.value = Array(3).fill(null).map((value, index) => (
        randomizeMealPosition(gameConfig.arenaConfig, index + 1)
      ));
    }

    function startSnakeMovement(): void {
      movementInterval.value = setInterval(() => {
        try {
          snakePositions.value = moveSnake(snakePositions.value, direction.value, gameConfig);
        } catch (error) {
          stopSnakeMovement();
          alert(error.message);
        }
      }, 300);
    }

    onMounted(() => {
      initiateMealPositions();
      startSnakeMovement();
    });

    return {
      eat,
      gameConfig,
      mealPositions,
      snakePositions,
      setDirection,
    };
  },
});
</script>
