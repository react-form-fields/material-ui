import { FormControlLabel, Typography } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { RadioProps } from '@material-ui/core/Radio';
import { SwitchProps } from '@material-ui/core/Switch';
import React, { ChangeEvent, Fragment } from 'react';

import { WithStyles } from '../decorators/withStyles';
import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  checked: boolean;
  helperText?: React.ReactNode;
  classes?: any;
  Component:
  React.ComponentType<CheckboxProps> |
  React.ComponentType<RadioProps> |
  React.ComponentType<SwitchProps>;
}

@WithStyles({
  containerAlign: {
    alignItems: 'flex-start'
  },
  labelAlign: {
    marginTop: 14
  },
  helperText: {
    marginTop: 5,
    opacity: 0.7,
    fontSize: '95%'
  }
})
export default class FieldSelectionBase extends FieldBase<IProps> {
  onChange(event: ChangeEvent<any>) {
    let value = event;

    if ((event || {} as any).target) {
      value = event.target.type === 'checkbox' ?
        event.target.checked :
        this.props.value;
    }

    super.onChange(value);
  }

  render() {
    const { value, label, checked, helperText, classes, disabled, Component } = this.props;

    return (
      <FormControlLabel
        className={helperText ? classes.containerAlign : null}
        control={
          <Component
            checked={checked}
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            value={(value || '').toString()}
          />
        }
        label={
          <Fragment>
            <Typography className={helperText ? classes.labelAlign : null}>{label}</Typography>
            {!!helperText &&
              <Typography className={classes.helperText}>
                {helperText}
              </Typography>
            }
          </Fragment>
        }

      />
    );
  }
}