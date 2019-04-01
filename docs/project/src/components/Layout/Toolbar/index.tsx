import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CoreToolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';

import { DrawerContext, IDrawerContext } from '../Drawer/context';

interface IProps extends IStyledProps {
  title: string;
}

@WithStyles(theme => ({
  root: {
    height: theme.variables.headerHeight,
    marginTop: theme.variables.contentPadding * -1,
    marginBottom: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.variables.contentPaddingUpSm * -1,
      marginBottom: theme.variables.contentPaddingUpSm
    }
  },
  appBar: {
    marginLeft: theme.variables.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.variables.drawerWidth}px)`
    }
  },
  iconMenu: {
    marginLeft: '-15px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
}))
export default class Toolbar extends PureComponent<IProps> {
  static contextType = DrawerContext;
  context: IDrawerContext;

  openDrawer = () => {
    this.context.open();
  }

  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color='primary'>

          <CoreToolbar>
            <Grid container alignItems='center'>
              <Grid item xs={false}>
                <IconButton
                  color='inherit'
                  onClick={this.openDrawer}
                  className={classes.iconMenu}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={true}>
                <Typography variant='h6' color='inherit'>{title}</Typography>
              </Grid>
              <Grid item xs={false}>
                <Tooltip title='Github'>
                  <IconButton color='inherit' target='_blank' href='https://github.com/react-form-fields/material-ui'>
                    <GithubCircleIcon size={30} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CoreToolbar>
        </AppBar>
      </div>
    );
  }
}