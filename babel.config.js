module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    ['inline-dotenv'],
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
