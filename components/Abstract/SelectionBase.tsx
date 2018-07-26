import { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import { RadioProps } from '@material-ui/core/Radio';
import { SwitchProps } from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography/Typography';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import * as React from 'react';

import { getConfig } from '../../config';
import { WithStyles } from '../../decorators/withStyles';

export interface IPropsSelectionBase extends IPropsFieldBase {
  onChange: (value: any) => void;
  label?: string;
  disabled?: boolean;
  checked: boolean;
  helperText?: React.ReactNode;
}

interface IProps extends IPropsSelectionBase {
  Component:
  React.ComponentType<CheckboxProps> |
  React.ComponentType<RadioProps> |
  React.ComponentType<SwitchProps>;
  classes?: any;
}

@WithStyles({
  containerAlign: {
    alignItems: 'flex-start'
  },
  labelAlign: {
    marginTop: 14
  },
  helperText: {
    opacity: 0.7,
    fontSize: '95%'
  }
})
export default class FieldSelectionBase extends FieldCoreBase<IProps> {
  onChange = (event: React.ChangeEvent<any>) => {
    let value = this.props.value;

    if ((event || {} as any).target && event.target.type === 'checkbox') {
      value = this.props.value ?
        (event.target.checked ? this.props.value : null) :
        event.target.checked;
    }

    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  onBlur = (e: any) => {
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
  }

  render() {
    const { value, label, checked, helperText, classes, disabled, Component } = this.props;

    return (
      <FormControlLabel
        className={helperText ? classes.containerAlign : null}
        control={
          checked ? //force recreation 
            <Component
              checked={true}
              disabled={disabled}
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={(value || '').toString()}
            /> :
            <Component
              checked={false}
              disabled={disabled}
              onChange={this.onChange}
              onBlur={this.onBlur}
              value={(value || '').toString()}
            />
        }
        label={
          <React.Fragment>
            {!!label &&
              <React.Fragment>
                <Typography className={helperText ? classes.labelAlign : null}>{label}</Typography>
                {!!helperText &&
                  <Typography className={classes.helperText}>
                    {helperText}
                  </Typography>
                }
              </React.Fragment>
            }
            {this.props.children}
          </React.Fragment>
        }

      />
    );
  }
}