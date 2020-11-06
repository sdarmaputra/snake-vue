import { mount } from '@vue/test-utils';
import GameControls from './GameControls.vue';

const testIds = {
  upButton: 'up-button',
  downButton: 'down-button',
  leftButton: 'left-button',
  rightButton: 'right-button',
};

function findByTestId(wrapper, testId) {
  return wrapper.find(`[data-testid="${testId}"]`);
}

describe.each([
  [testIds.upButton, 'up'],
  [testIds.downButton, 'down'],
  [testIds.leftButton, 'left'],
  [testIds.rightButton, 'right'],
])('when %s is clicked', (testId, direction) => {
  it(`should emit "set-direction" event with value "${direction}"`, async () => {
    const $target = await mount(GameControls);
    const $button = findByTestId($target, testId);

    $button.trigger('click');

    expect($target.emitted('set-direction')[0]).toEqual([direction]);
  });
});

describe.each([
  ['ArrowUp', 'up'],
  ['ArrowDown', 'down'],
  ['ArrowLeft', 'left'],
  ['ArrowRight', 'right'],
])('when %s key is pressed down', (keyCode, direction) => {
  it(`should emit "set-direction" event with value "${direction}"`, async () => {
    const $target = await mount(GameControls);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: keyCode }));

    expect($target.emitted('set-direction')[0]).toEqual([direction]);
  });
});
