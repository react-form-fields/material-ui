import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';
import { Fragment } from 'react';

import { IMenu } from '../..';

interface IState {
  expanded: boolean;
  active: boolean;
}

interface IProps {
  data: IMenu;
  onClick: (menu: IMenu) => void;
  classes?: any;
}

@WithStyles(theme => ({
  item: {
    paddingLeft: 14,
    opacity: 0.8,
    '&.active': {
      opacity: 1,
      background: darken(theme.palette.primary.main, 0.30)
    }
  },
  icon: {
    margin: '0',
    fill: theme.palette.primary.contrastText
  },
  text: {
    color: 'inherit'
  },
  innerList: {
    padding: 0,
    width: '100%',
    '& > div': {
      paddingLeft: 40
    }
  }
}))
export default class DrawerListItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false, active: false };
  }

  handleClick = () => {
    this.props.onClick(this.props.data);
  }

  handleSubClick = (menu: IMenu) => {
    this.props.onClick(menu);
  }

  handleExandedClick = (event: any, expanded: boolean) => {
    this.setState({ expanded });
  }

  render() {
    const { active } = this.state;
    const { data, classes } = this.props;

    return (
      <Fragment>
        <ListItem
          button
          disableGutters
          className={`${classes.item} ${active ? 'active' : ''}`}
          onClick={this.handleClick}
        >
          {!!data.icon &&
            <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
              <data.icon />
            </ListItemIcon>
          }
          <ListItemText primary={data.title} classes={{ primary: classes.text }} />
        </ListItem>

        {!!data.submenu && !!data.submenu.length &&
          <List className={classes.innerList}>
            {data.submenu.map(sub =>
              <DrawerListItem key={sub.path} data={sub} onClick={this.handleSubClick} />
            )}
          </List>
        }
      </Fragment>
    );
  }

}