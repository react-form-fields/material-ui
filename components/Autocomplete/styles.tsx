import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { AppStyle } from '../../decorators/withStyles';

const styles: AppStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    color: 'inherit'
  },
  paper: {
    marginTop: 5,
    width: 'calc(100% + 20px)',
    marginRight: -10,
    transform: 'translateX(-10px)',
    borderRadius: theme.shape.borderRadius,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default styles;