import { CircularProgress, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  options?: { value: string | number, label: string }[];
  loading?: boolean;
}

export default class FieldSelect extends FieldBase<IProps> {
  onChange = (event: any) => {
    const value = event.target ? event.target.value : event;

    this.setState({ touched: true });
    this.props.onChange(value);
  }

  render() {
    const { value, options, children, loading } = this.props;

    return (
      <Fragment>
        {super.render()}

        <TextField
          {...{
            fullWidth: true,
            margin: 'normal',
            ...this.props,
            value: !value ? '' : value,
            required: this.isRequired,
            select: true,
            error: !!this.errorMessage,
            helperText: this.errorMessage,
            onChange: this.onChange.bind(this),
            submitted: null,
            touched: null,
            loading: null
          }}
          InputProps={{
            endAdornment: !loading ? null : (
              <InputAdornment position='end'>
                <CircularProgress size={20} />
              </InputAdornment>
            )
          }}
        >
          <MenuItem value={''}>
            Selecione...
          </MenuItem>
          {(options || []).map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {children}
        </TextField>
      </Fragment>
    );
  }
}