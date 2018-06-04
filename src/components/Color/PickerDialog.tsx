import React, { PureComponent } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';

import { WithStyles } from '../../decorators/withStyles';

interface IProps {
  value: any;
  classes?: any;
  onChange: ColorChangeHandler;
  onDismiss: () => void;
}

@WithStyles({
  container: {
    position: 'absolute',
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
export default class PickerDialog extends PureComponent<IProps> {
  render() {
    const { value, onDismiss, onChange, classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.position} onClick={onDismiss} />
        <ChromePicker color={value} onChange={onChange} />
      </div>
    );
  }
}