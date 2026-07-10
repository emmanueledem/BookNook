module.exports = {
  preset: 'jest-expo',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|react-native|expo(nent)?|@expo(nent)?/.*|expo-router|@expo/.*|@react-navigation/.*))',
  ],
};
