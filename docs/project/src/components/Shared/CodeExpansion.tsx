import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import React, { PureComponent } from 'react';

interface IState {
  expanded: boolean;
}

interface IProps extends IStyledProps {
  title?: string;
}

@WithStyles({
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
    const { children, classes, title } = this.props;

    return (
      <div>
        <Grid container alignItems='center'>
          <Grid item xs={true}>
            {!!title && <Typography variant='h6'>{title}</Typography>}
          </Grid>
          <Grid item xs={false}>
            <IconButton onClick={this.toogleExpanded}>
              <CodeTagsIcon />
            </IconButton>
          </Grid>
        </Grid>

        <ExpansionPanel expanded={expanded} className={classes.expansionPanel}>
          <div className={classes.code}>
            {children}
          </div>
        </ExpansionPanel>
      </div>
    );
  }
}