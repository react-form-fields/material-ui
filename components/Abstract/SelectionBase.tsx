import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel/FormControlLabel';
import Typography from '@material-ui/core/Typography/Typography';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';

import { getConfig } from '../../config';
import { WithStyles } from '../../decorators/withStyles';

export interface IPropsSelectionBase extends IPropsFieldBase {
  onChange: (value: any) => void;
  label?: string;
  disabled?: boolean;
  checked: boolean;
  helperText?: React.ReactNode;
  disableLabelMargin?: boolean;
  FormControlLabelProps?: Partial<FormControlLabelProps>;
}

interface IProps extends IPropsSelectionBase {
  Component: any;
  classes?: any;
}

@WithStyles({
  containerAlign: {
    alignItems: 'flex-start'
  },
  labelAlign: {
    marginTop: 14
  },
  labelRight: {
    textAlign: 'right'
  },
  helperText: {
    opacity: 0.7,
    fontSize: '95%'
  }
})
export default class FieldSelectionBase extends FieldCoreBase<IProps> {
  get labelClassName(): string {
    const { helperText, disableLabelMargin, classes, FormControlLabelProps } = this.props;
    return (helperText && !disableLabelMargin ? classes.labelAlign : '') +
      (FormControlLabelProps && FormControlLabelProps.labelPlacement === 'start' ? classes.labelRight : '');
  }

  get helperTextClassName(): string {
    const { FormControlLabelProps, classes } = this.props;
    return classes.helperText +
      (FormControlLabelProps && FormControlLabelProps.labelPlacement === 'start' ? classes.labelRight : '');
  }

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
    const { value, label, checked, helperText, classes, disabled, Component, FormControlLabelProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <FormControlLabel
          {...(FormControlLabelProps || {})}
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
                  <Typography className={this.labelClassName}>{label}</Typography>
                  {!!helperText &&
                    <Typography className={this.helperTextClassName}>
                      {helperText}
                    </Typography>
                  }
                </React.Fragment>
              }
              {this.props.children}
            </React.Fragment>
          }

        />
      </React.Fragment>
    );
  }
}