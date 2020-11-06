<template>
  <div class="controls">
    <button
      class="controls__button"
      data-testid="up-button"
      @click="setDirection('up')"
    >
      &uarr;
    </button>

    <div class="controls__middle">
      <button
        class="controls__button"
        data-testid="left-button"
        @click="setDirection('left')"
      >
        &larr;
      </button>
      <div class="controls__button controls__button--empty">
        &nbsp;
      </div>
      <button
        class="controls__button"
        data-testid="right-button"
        @click="setDirection('right')"
      >
        &rarr;
      </button>
    </div>

    <button
      class="controls__button"
      data-testid="down-button"
      @click="setDirection('down')"
    >
      &darr;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Direction, KeyDirectionMap } from '../../types/Control';

const keyDirectionMap: KeyDirectionMap = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
};

export default defineComponent({
  name: 'GameControls',

  emits: ['set-direction'],

  mounted() {
    this.initiateEventListeners();
  },

  methods: {
    initiateEventListeners() {
      document.addEventListener('keydown', (event) => {
        this.setDirection(keyDirectionMap[event.code]);
      });
    },

    setDirection(direction: Direction) {
      this.$emit('set-direction', direction);
    },
  },
});
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;

  &__middle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__button {
    width: 60px;
    height: 60px;
    background: #222222;
    color: #ffffff;
    padding: 8px;
    border-radius: 8px;
    border: none;
    font-size: 2rem;

    &--empty {
      background: transparent;
      padding: 0;
    }
  }
}
</style>
