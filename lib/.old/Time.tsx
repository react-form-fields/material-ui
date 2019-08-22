import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import TimePicker from 'material-ui-pickers/TimePicker';
import * as React from 'react';

import { getConfig } from '../config';
import { IBaseFieldProps, TimePropsResolver } from '../interfaces/props';

interface IProps extends TimePropsResolver, IBaseFieldProps, IPropsFieldBase {
  value: Date;
  helperText?: React.ReactNode;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  keepTime?: boolean;
}

export default class FieldTime extends FieldCoreBase<IProps> {
  onChange = (date?: Date) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(date);
  }

  onBlur = (e: any) => {
    this.props.onBlur && this.props.onBlur(e);
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
  }

  render() {
    const { value, label, format, helperText, validation, validationContext, onBlur, mask, ...extraProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <TimePicker
          clearable
          clearLabel={getConfig().dateLabels.clear}
          okLabel={getConfig().dateLabels.ok}
          cancelLabel={getConfig().dateLabels.cancel}
          format={format || getConfig().timeFormat}
          fullWidth={true}
          margin={'normal'}
          {...extraProps}
          label={label}
          value={value || null}
          error={!!this.errorMessage}
          helperText={this.errorMessage || helperText}
          required={this.isRequired}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </React.Fragment >
    );
  }
}