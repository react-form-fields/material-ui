import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import DatePicker from 'material-ui-pickers/DatePicker';
import { DatePickerWrapperProps } from 'material-ui-pickers/DatePicker/DatePickerWrapper';
import DateUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';

import { getConfig } from '../config';

type PropsResolver = {
  [K in Exclude<keyof IPropsFieldBase, keyof DatePickerWrapperProps | 'mask'>]?: IPropsFieldBase[K]
};

interface IProps extends DatePickerWrapperProps, PropsResolver {
  value: Date;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
}

export default class FieldDate extends FieldCoreBase<IProps> {
  onChange = (date?: Date) => {
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
            format={format || getConfig().dateFormat}
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