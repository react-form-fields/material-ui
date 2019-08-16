import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import { IMenu } from '..';
import DrawerListItem from './ListItem';

interface IProps {
  menu: IMenu[];
  navigate: (path: string) => void;
  close: () => void;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    height: '100vh'
  },
  header: {
    padding: `3.5px ${theme.variables.contentPadding}px`,
    color: theme.palette.primary.contrastText,
    background: darken(theme.palette.primary.main, 0.15)
  },
  logo: {
    maxWidth: '100%',
    maxHeight: 53
  },
  title: {
    color: 'inherit',
    lineHeight: 'normal',
    fontSize: 18,
  },
  subtitle: {
    color: 'inherit',
    lineHeight: 'normal',
    fontSize: 21
  },
  list: {
    padding: 0
  }
}))
export default class Content extends PureComponent<IProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  navigate = (menu: IMenu) => {
    this.props.navigate(menu.path);
  }

  render() {
    const { classes, menu } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Grid container spacing={8} alignItems='center'>
            <Grid item xs={true}>
              <Typography className={classes.title}>React Form Fields</Typography>
              <Typography className={classes.subtitle}>Material UI</Typography>
            </Grid>
          </Grid>
        </div>

        <List className={classes.list}>
          {menu.map(item =>
            <DrawerListItem key={item.path} data={item} onClick={this.navigate} />
          )}
        </List>
      </div>
    );
  }
}