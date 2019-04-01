import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import props from './props';
import variables from './variables';

export const primary = {
  light: '#6d6d6d',
  main: '#424242',
  dark: '#1b1b1b',
  contrastText: '#fff',
};

export const secondary = {
  light: '#4ec485',
  main: '#009358',
  dark: '#00642e',
  contrastText: '#fff',
};

export const theme = createMuiTheme({
  palette: { primary, secondary },
  typography: { useNextVariants: true },
  overrides,
  variables,
  props
});

export const reverseTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: { primary: secondary, secondary: primary },
  overrides,
  variables,
  props
});