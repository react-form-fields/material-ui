import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select';
import FieldCoreBase from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';

import { getConfig } from '../config';
import { IBaseFieldProps, SelectPropsResolver } from '../interfaces/props';

interface IProps extends IBaseFieldProps, SelectPropsResolver {
  options?: { value: string | number, label: string, disabled?: boolean }[];
  loading?: boolean;
  helperText?: string;
  onChange: (value: any) => void;
  emptyOption?: string;
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
    const { value, options, children, label, loading, helperText, emptyOption, ...extra } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <FormControl margin={extra.margin || 'normal'} fullWidth error={!!this.errorMessage} variant={extra.variant}>
          {!!label &&
            <InputLabel required={this.isRequired} shrink={!!emptyOption} error={!!this.errorMessage} variant={extra.variant}>{label}</InputLabel>
          }
          <Select
            {...{
              fullWidth: true,
              endAdornment: !loading ? null : (
                <InputAdornment position='end'>
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
              ...extra,
              displayEmpty: !!emptyOption,
              value: !value ? '' : value,
              required: this.isRequired,
              error: !!this.errorMessage,
              onChange: this.onChange,
              onBlur: this.onBlur,
              submitted: null,
              touched: null,
              loading: null
            }}
          >
            {emptyOption &&
              <MenuItem value={''}>{emptyOption}</MenuItem>
            }
            {(options || []).map(option => (
              <MenuItem disabled={option.disabled} key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            {children}
          </Select>
          {!!(this.errorMessage || helperText) &&
            <FormHelperText error={!!this.errorMessage} variant={extra.variant}>{this.errorMessage || helperText}</FormHelperText>
          }
        </FormControl>
      </React.Fragment>
    );
  }
}