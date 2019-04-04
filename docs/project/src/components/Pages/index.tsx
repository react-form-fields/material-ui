import Drawer, { IMenu } from 'components/Layout/Drawer';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import HomePage from './Home';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm,
    }
  }
}))
export default class Pages extends PureComponent<IProps, {}> {
  mainContent: React.RefObject<HTMLMainElement> = React.createRef();
  menu: IMenu[] = [
    { path: '/', title: 'Getting Started' }
  ];

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Drawer menu={this.menu}>
            <main ref={this.mainContent} className={classes.content}>
              <Switch>
                <Route path='/' component={HomePage} />
                <Route render={() => <Redirect to='/' />} />
              </Switch>
            </main>
          </Drawer>
        </div>
      </BrowserRouter>
    );
  }
}
