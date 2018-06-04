import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  mask?: 'phone';
  loading?: boolean;
}

export default class FieldText extends FieldBase<IProps> {
  private readonly masks: any = {
    phone: {
      apply: (value: string) => {
        if (!value) return value;

        const regexp = value.length > 10 ?
          /^(\d{0,2})(\d{0,5})(\d{0,4}).*/ :
          /^(\d{0,2})(\d{0,4})(\d{0,4}).*/;

        const result = value.length > 2 ?
          '($1) $2-$3' : '($1$2$3';

        return value.replace(regexp, result).replace(/-$/, '');
      },
      clean: (value: string) => value.replace(/\D/gi, '').substr(0, 11)
    },
  };

  onChange(event: any) {
    const value = this.cleanValue(event.target ? event.target.value : event);
    super.onChange(value);
  }

  getValue(): string {
    const { value, mask } = this.props;

    const maskFunc = this.masks[mask];
    return !maskFunc ? value : maskFunc.apply(value);
  }

  cleanValue(value: string) {
    const { mask } = this.props;

    const maskFunc = this.masks[mask];
    return !maskFunc ? value : maskFunc.clean(value);
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
            )
          }}
        />
      </Fragment>
    );
  }
}