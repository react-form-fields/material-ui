import CoreDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { IRouteProps, WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import MoreIcon from 'mdi-react/MoreIcon';
import React, { Fragment, PureComponent } from 'react';

import Content from './Content';
import { DrawerContext } from './context';

export interface IMenu {
  path: string;
  icon?: typeof MoreIcon;
  title: string;
  submenu?: IMenu[];
}

interface IState {
  drawerOpened: boolean;
}

interface IProps extends IRouteProps {
  menu: IMenu[];
  classes?: any;
}

@WithRouter()
@WithStyles(theme => ({
  drawer: {
    width: theme.variables.drawerWidth,
    borderRight: 'none !important',
    boxShadow: `${theme.variables.boxShadow} !important`,
    [theme.breakpoints.up('md')]: {
      width: theme.variables.drawerWidth,
      position: 'relative',
      height: '100vh'
    }
  },
}))
export default class Drawer extends PureComponent<IProps, IState> {
  modalProps = { keepMounted: true };
  drawerClasses = { paper: this.props.classes.drawer };

  constructor(props: IProps) {
    super(props);
    this.state = { drawerOpened: false };
  }

  navigate = (url: string) => {
    this.props.history.push(url);
    this.close();
  }

  open = () => this.setState({ drawerOpened: true });
  close = () => this.setState({ drawerOpened: false });

  render() {
    const { drawerOpened } = this.state;
    const { menu, children } = this.props;

    const content = <Content menu={menu} navigate={this.navigate} close={this.close} />;

    return (
      <Fragment>
        <DrawerContext.Provider value={this}>
          <Hidden mdUp implementation='css'>
            <CoreDrawer
              variant='temporary'
              anchor='left'
              open={drawerOpened}
              classes={this.drawerClasses}
              onClose={this.close}
              ModalProps={this.modalProps}
            >
              {content}
            </CoreDrawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <CoreDrawer
              variant='permanent'
              open
              classes={this.drawerClasses}
            >
              {content}
            </CoreDrawer>
          </Hidden>

          {children}
        </DrawerContext.Provider>
      </Fragment>
    );
  }
}