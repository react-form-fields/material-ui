import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FieldCoreBase from '@react-form-fields/core/components/FieldCoreBase';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { Moment } from 'moment';
import * as React from 'react';

import { getConfig } from '../config';
import { ITextFieldProps } from '../interfaces/props';

interface IProps extends ITextFieldProps {
  value: Date;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  locale?: string;
}

export default class FieldDate extends FieldCoreBase<IProps> {
  onChange = (value: Moment) => {
    const date = value ? value.startOf('day').toDate() : null;

    this.setState({ touched: true });
    this.props.onChange(date);
  }

  render() {
    const { value, label, format, locale, helperText, validationContext, ...extraProps } = this.props;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale || getConfig().defaultDateLocale}>
          {super.render()}

          <DatePicker
            {...extraProps}
            clearable
            clearLabel={'Limpar'}
            okLabel={'OK'}
            cancelLabel={'Cancelar'}
            label={label}
            value={value || null}
            format={format || 'DD/MM/YYYY'}
            fullWidth={true}
            margin={'normal'}
            leftArrowIcon={<ChevronLeftIcon />}
            rightArrowIcon={<ChevronRightIcon />}
            error={!!this.errorMessage}
            helperText={this.errorMessage || helperText}
            required={this.isRequired}
            onChange={this.onChange.bind(this)}
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}