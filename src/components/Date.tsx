import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import React, { Fragment } from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  onChange: (value: Date) => void;
}

export default class FieldDate extends FieldBase<IProps> {
  onChange(value: Moment) {
    super.onChange(value ? value.startOf('day').toDate() : null);
  }

  render() {
    const { value, label, format, helperText, validationContext, ...extraProps } = this.props;

    return (
      <Fragment>
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
          leftArrowIcon={<ChevronLeftIcon.default />}
          rightArrowIcon={<ChevronRightIcon.default />}
          error={!!this.errorMessage}
          helperText={this.errorMessage || helperText}
          required={this.isRequired}
          onChange={this.onChange.bind(this)}
        />
      </Fragment>
    );
  }
}