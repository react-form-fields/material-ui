import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import DatePicker from 'material-ui-pickers/DatePicker';
import * as React from 'react';

import { getConfig } from '../config';
import { DatePropsResolver, IBaseFieldProps } from '../interfaces/props';

interface IProps extends DatePropsResolver, IBaseFieldProps, IPropsFieldBase {
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

export default class FieldDate extends FieldCoreBase<IProps> {
  removeTime = (date: Date) => {
    if (!date || this.props.keepTime) return date;

    return dateFnsParse(dateFnsFormat(date, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date(), {
      locale: getConfig().dateLocale
    });
  }

  onChange = (date?: Date) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(this.removeTime(date));
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

        <DatePicker
          clearable
          clearLabel={getConfig().dateLabels.clear}
          okLabel={getConfig().dateLabels.ok}
          cancelLabel={getConfig().dateLabels.cancel}
          fullWidth={true}
          margin={'normal'}
          leftArrowIcon={<ChevronLeftIcon />}
          rightArrowIcon={<ChevronRightIcon />}
          {...extraProps}
          label={label}
          value={value || null}
          format={format || getConfig().dateFormat}
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