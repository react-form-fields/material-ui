import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import TextField from '@material-ui/core/TextField/TextField';
import FieldCoreBase from '@react-form-fields/core/components/FieldCoreBase';
import * as React from 'react';

import { getConfig } from '../config';
import { ITextFieldProps } from '../interfaces/props';

interface IProps extends ITextFieldProps {
  options?: { value: string | number, label: string }[];
  loading?: boolean;
  onChange: (value: any) => void;
}

export default class FieldSelect extends FieldCoreBase<IProps> {
  onChange = (event: any) => {
    const value = event.target ? event.target.value : event;

    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  onBlur = (e: any) => {
    this.props.onBlur && this.props.onBlur(e);
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
  }

  render() {
    const { value, options, children, loading } = this.props;

    return (
      <React.Fragment>
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
            onChange: this.onChange,
            onBlur: this.onBlur,
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
      </React.Fragment>
    );
  }
}