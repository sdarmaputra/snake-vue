<template>
  <div class="controls">
    <button
      ref="up"
      class="controls__button"
      data-testid="up-button"
      @click="clickButton('up', $event)"
    >
      &uarr;
    </button>

    <div class="controls__middle">
      <button
        ref="left"
        class="controls__button"
        data-testid="left-button"
        @click="clickButton('left', $event)"
      >
        &larr;
      </button>
      <div class="controls__button controls__button--empty">
        &nbsp;
      </div>
      <button
        ref="right"
        class="controls__button"
        data-testid="right-button"
        @click="clickButton('right', $event)"
      >
        &rarr;
      </button>
    </div>

    <button
      ref="down"
      class="controls__button"
      data-testid="down-button"
      @click="clickButton('down', $event)"
    >
      &darr;
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue';
import { Direction } from '../../types/Control';

export default defineComponent({
  name: 'GameControls',

  emits: ['set-direction'],

  setup(props, context) {
    const up = ref(null);
    const right = ref(null);
    const left = ref(null);
    const down = ref(null);
    const buttons: { [directionKey: string]: any } = {
      ArrowLeft: left,
      ArrowUp: up,
      ArrowRight: right,
      ArrowDown: down,
    };

    function setDirection(direction: Direction): void {
      context.emit('set-direction', direction);
    }

    onMounted(() => {
      document.addEventListener('keydown', (event) => {
        const button = buttons[event.code] && buttons[event.code].value;
        if (button) button.click();
      });
    });

    return {
      setDirection,
      up,
      right,
      left,
      down,
    };
  },

  methods: {
    clickButton(direction: Direction, event: MouseEvent): void {
      this.setDirection(direction);

      const element = event.target as HTMLElement;
      element.classList.add('controls__button--pressed');
      setTimeout(() => {
        element.classList.remove('controls__button--pressed');
      }, 200);
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

    &:active, &:focus {
      outline: none;
    }

    &--pressed {
      transform: scale(0.9);
      background: #000000;
    }

    &--empty {
      background: transparent;
      padding: 0;
    }
  }
}
</style>
