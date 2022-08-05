module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['inline-dotenv'],
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@styles': './src/styles',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@contexts': './src/contexts',
          '@services': './src/services',
          '@constants': './src/constants',
          '@components': './src/components',
        },
      },
    ],
  ],
};
