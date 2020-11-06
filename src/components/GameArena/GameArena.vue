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
import { defineComponent } from 'vue';
import {
  ArenaMatrix,
  ArenaConfig,
  Positions,
} from '../../types/Arena';

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

  data() {
    return {
      arenaMatrix: [] as ArenaMatrix,
    };
  },

  watch: {
    snakePositions() {
      this.drawArenaMatrix();
    },
  },

  mounted() {
    this.drawArenaMatrix();
  },

  methods: {
    drawArenaMatrix() {
      const arena: ArenaMatrix = Array(this.config.height);

      for (let row = 0; row < this.config.height; row += 1) {
        for (let col = 0; col < this.config.width; col += 1) {
          if (!Array.isArray(arena[row])) {
            arena[row] = [];
          }

          arena[row][col] = 'empty';
        }
      }

      this.mealPositions.forEach(({ x, y }) => {
        arena[y][x] = 'meal';
      });

      this.snakePositions.forEach(({ x, y }) => {
        if (arena[y][x] === 'meal') this.$emit('eat', { x, y });
        arena[y][x] = 'snake';
      });

      this.arenaMatrix = arena;
    },
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
