import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { PureComponent } from 'react';

import ToastGlobalProvider from './global';

interface IState {
  opened: boolean;
  message?: string;
}

interface IProps {
  opened: boolean;
  message?: string;
  timeout?: number;
  onClose: () => void;
  classes?: any;
}

@WithStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up('sm')]: {
      top: '24px',
      left: 'auto',
      right: '24px'
    }
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}))
export default class Toast extends PureComponent<IProps, IState> {
  static Global = ToastGlobalProvider;

  constructor(props: IProps) {
    super(props);
    this.state = { opened: false };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
    if (!nextProps.opened) {
      return {
        ...prevState,
        opened: false
      };
    }

    return {
      opened: nextProps.opened,
      message: nextProps.message
    };
  }

  static show(message: string, timeout?: number) {
    return ToastGlobalProvider.show(message, timeout || 2000);
  }

  handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') return;
    this.props.onClose();
  }

  public render(): JSX.Element {
    const { opened, message } = this.state;
    const { timeout, classes, onClose } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={opened}
        autoHideDuration={timeout}
        onClose={this.handleClose}
        message={<span>{message}</span>}
        className={classes.wrapper}
        action={[
          <IconButton
            key='close'
            color='inherit'
            className='close'
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}