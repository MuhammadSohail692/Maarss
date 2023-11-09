module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './assets',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@types': './src/types',
            '@constants': './src/constants',
            '@reducers': './src/reducers',
            '@service': './src/service',
            '@store': './src/store',
            '@components': './src/components',
            '@model': './src/model',
            '@utils': './src/utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
