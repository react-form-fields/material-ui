import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';

import { getMask, IMaskFunction } from '../mask';
import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase<string> {
  mask?: 'phone';
  loading?: boolean;
}

export default class FieldText extends FieldBase<IProps> {
  get mask(): IMaskFunction {
    let mask = getMask(this.props.mask);

    if (!mask) {
      mask = { apply: v => v, clean: v => v };
      this.props.mask && console.warn(`material-ui-form-fields: Mask '${this.props.mask}' not found`)
    }

    return mask;
  }

  onChange = (event: any) => {
    const value = this.cleanValue(event.target ? event.target.value : event);

    this.setState({ touched: true });
    this.props.onChange(value);
  }

  getValue(): string {
    return this.mask.apply(this.props.value);
  }

  cleanValue(value: string) {
    return this.mask.clean(value);
  }

  render() {
    const value = this.getValue();
    const { loading, helperText, multiline, validationContext, ...extraProps } = this.props;

    return (
      <Fragment>
        {super.render()}

        <TextField
          {...{
            fullWidth: true,
            margin: 'normal',
            rows: multiline ? 4 : null,
            ...extraProps,
            multiline,
            required: this.isRequired,
            value: (value === undefined || value === null ? '' : value).toString(),
            error: !!this.errorMessage,
            helperText: this.errorMessage || helperText,
            onChange: this.onChange.bind(this),
            submitted: null,
            touched: null,
            loading: null
          }}
          InputProps={{
            endAdornment: !loading ? null : (
              <InputAdornment position='end'>
                <CircularProgress color='secondary' size={25} />
              </InputAdornment>
            ),
            ...(extraProps.InputProps || {})
          }}
        />
      </Fragment>
    );
  }
}
