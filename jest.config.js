module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    '**/*.test.[jt]s',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
