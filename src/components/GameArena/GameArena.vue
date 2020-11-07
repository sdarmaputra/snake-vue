<template>
  <div class="arena">
    <div
      v-for="(row, rowIndex) in arenaMatrix"
      :key="rowIndex"
      class="arena__row"
    >
      <div
        v-for="(cellType, colIndex) in row"
        :key="colIndex"
        :class="`arena__cell arena__${cellType}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';
import {
  ArenaConfig,
  ArenaMatrix,
  Positions,
} from '../../types/Arena';
import drawArenaMatrix from '../../utils/draw-arena-matrix';

export default defineComponent({
  name: 'GameArena',

  props: {
    config: {
      type: Object as () => ArenaConfig,
      default: () => ({
        width: 32,
        height: 32,
      }),
    },

    snakePositions: {
      type: Array as () => Positions,
      default: () => [],
    },

    mealPositions: {
      type: Array as () => Positions,
      default: () => [],
    },
  },

  emits: ['eat'],

  setup(props, { emit }) {
    const arenaMatrix = ref<ArenaMatrix>([]);
    const { snakePositions } = toRefs(props);

    function drawArena(): void {
      const { arenaMatrix: matrix, eatenMealPosition } = drawArenaMatrix({
        arenaConfig: props.config,
        mealPositions: props.mealPositions,
        snakePositions: props.snakePositions,
      });

      arenaMatrix.value = matrix;

      if (eatenMealPosition) {
        emit('eat', eatenMealPosition);
      }
    }

    watch(snakePositions, () => drawArena());

    onMounted(() => drawArena());

    return {
      arenaMatrix,
    };
  },
});
</script>

<style lang="scss" scoped>
.arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 16px 48px;

  &__row {
    display: flex;
    flex-direction: row;
  }

  &__cell {
    width: 8px;
    height: 8px;
    border: 1px solid #eeeeee;
    background: #dddddd;
  }

  &__snake {
    background: mediumseagreen;
  }

  &__meal {
    background: peru;
  }
}
</style>
