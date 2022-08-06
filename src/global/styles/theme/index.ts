import { extendTheme } from 'native-base';

const newColorTheme = {
  gray: {
    50: '#FCFCFC',
    300: '#A3A9A7',
    600: '#545752',
  },
  green: {
    600: '#108B64',
    800: '#024221',
    900: '#041B10',
  },
  yellow: {
    300: '#FFB837',
  },
  blue: {
    500: '#4267B2',
  },
};

const theme = extendTheme({ colors: newColorTheme });

export { theme };
