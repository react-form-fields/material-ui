import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import IconButton from '@material-ui/core/IconButton';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import React, { PureComponent } from 'react';

interface IState {
  expanded: boolean;
}

interface IProps extends IStyledProps {

}

@WithStyles({
  wrapper: {
    textAlign: 'right'
  },
  expansionPanel: {
    textAlign: 'left',
    '&:before': { display: 'none' }
  },
  code: {
    '&>div': { margin: 0 }
  }
})
export default class CodeExpansion extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false };
  }

  toogleExpanded = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  }

  render() {
    const { expanded } = this.state;
    const { children, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <IconButton onClick={this.toogleExpanded}>
          <CodeTagsIcon />
        </IconButton>

        <ExpansionPanel expanded={expanded} className={classes.expansionPanel}>
          <div className={classes.code}>
            {children}
          </div>
        </ExpansionPanel>
      </div>
    );
  }
}