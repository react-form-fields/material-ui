import * as React from 'react';
import { ColorChangeHandler } from 'react-color';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';

import { WithStyles } from '../../decorators/withStyles';

interface IProps {
  value: any;
  classes?: any;
  onChange: ColorChangeHandler;
  onDismiss: () => void;
}

@WithStyles({
  wrapper: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2
  },
  position: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
export default class PickerDialog extends React.PureComponent<IProps> {
  render() {
    const { value, onDismiss, onChange, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.position} onClick={onDismiss} />
          <ChromePicker color={value} onChange={onChange} />
        </div>
      </div>
    );
  }
}