/* eslint-disable */
export default {
  displayName: 'medon-fe',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/medon-fe',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/components/__tests__/svg.js',
  },
};
