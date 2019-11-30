import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DateTimePicker } from '@material-ui/pickers';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';

import { getConfig } from '../config';
import { DateTimePropsResolver, IBaseFieldProps } from '../interfaces/props';

interface IProps extends DateTimePropsResolver, IBaseFieldProps, IPropsFieldBase {
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

export default class FieldDateTime extends FieldCoreBase<IProps> {
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

        <DateTimePicker
          clearable
          clearLabel={getConfig().dateLabels.clear}
          okLabel={getConfig().dateLabels.ok}
          cancelLabel={getConfig().dateLabels.cancel}
          format={format || getConfig().dateTimeFormat}
          fullWidth={true}
          margin={'normal'}
          leftArrowIcon={<ChevronLeftIcon />}
          rightArrowIcon={<ChevronRightIcon />}
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