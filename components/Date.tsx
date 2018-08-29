import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FieldCoreBase from '@react-form-fields/core/components/FieldCoreBase';
import { DateTime } from 'luxon';
import DatePicker from 'material-ui-pickers/DatePicker';
import { DatePickerWrapperProps } from 'material-ui-pickers/DatePicker/DatePickerWrapper';
import DateUtils from 'material-ui-pickers/utils/luxon-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';

import { getConfig } from '../config';

interface IProps extends DatePickerWrapperProps {
  value: Date;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
}

export default class FieldDate extends FieldCoreBase<IProps> {
  onChange = (value: DateTime) => {
    const date = value ? value.toJSDate() : null;

    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(date);
  }

  onBlur = (e: any) => {
    this.props.onBlur && this.props.onBlur(e);
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
  }

  render() {
    const { value, label, format, helperText, ...extraProps } = this.props;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateUtils} locale={getConfig().dateLocale}>
          {super.render()}

          <DatePicker
            {...extraProps}
            clearable
            clearLabel={'Limpar'}
            okLabel={'OK'}
            cancelLabel={'Cancelar'}
            label={label}
            value={value || null}
            format={format || 'D'}
            fullWidth={true}
            margin={'normal'}
            leftArrowIcon={<ChevronLeftIcon />}
            rightArrowIcon={<ChevronRightIcon />}
            error={!!this.errorMessage}
            helperText={this.errorMessage || helperText}
            required={this.isRequired}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}