import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import TextField from '@material-ui/core/TextField/TextField';
import FieldCoreBase from '@react-form-fields/core/components/FieldCoreBase';
import * as React from 'react';

import { getConfig } from '../config';
import { ITextFieldProps } from '../interfaces/props';

interface IProps extends ITextFieldProps {
  mask?: 'phone';
  loading?: boolean;
  value: any;
  onChange: (value: any) => void;
}

export default class FieldText extends FieldCoreBase<IProps> {
  onChange = (event: any) => {
    const value = this.cleanValue(event.target ? event.target.value : event);

    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  onBlur = (e: any) => {
    this.props.onBlur && this.props.onBlur(e);
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
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
      <React.Fragment>
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
            onChange: this.onChange,
            onBlur: this.onBlur,
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
      </React.Fragment>
    );
  }
}
