import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import TextField from '@material-ui/core/TextField/TextField';
import useConfigContext from '@react-form-fields/core/hooks/useConfigContext';
import useMask from '@react-form-fields/core/hooks/useMask';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import * as React from 'react';

import { IBaseFieldProps, TextFieldPropsResolver } from './interfaces/props';

interface IProps extends IBaseFieldProps, TextFieldPropsResolver {
  loading?: boolean;
  value: any;
  onChange: (value: any) => void;
}

const FieldText = React.memo<IProps>(props => {
  const { loading, helperText, multiline, onBlur, onChange, ...extraProps } = props;

  const config = useConfigContext();
  const { maskedValue, maskClean } = useMask(props);
  const { setDirty, showError, errorMessage } = useValidation(props);

  const handleChange = React.useCallback(
    (event: any) => {
      const value = maskClean(event.target ? event.target.value : event);

      config.validationOn === 'onChange' && setDirty(true);
      onChange(value);
    },
    [config.validationOn, maskClean, onChange, setDirty]
  );

  const handleBlur = React.useCallback(
    (e: any) => {
      onBlur && onBlur(e);
      config.validationOn === 'onBlur' && setDirty(true);
    },
    [config.validationOn, onBlur, setDirty]
  );

  return (
    <TextField
      {...({
        fullWidth: true,
        margin: 'normal',
        rows: multiline ? 4 : null,
        ...extraProps,
        multiline,
        value: (maskedValue ?? '').toString(),
        error: showError && errorMessage,
        helperText: showError ? errorMessage : helperText,
        onChange: handleChange,
        onBlur: handleBlur,
        submitted: null,
        touched: null,
        loading: null
      } as any)}
      InputProps={{
        endAdornment: !loading ? null : (
          <InputAdornment position='end'>
            <CircularProgress color='secondary' size={20} />
          </InputAdornment>
        ),
        ...(extraProps.InputProps || {})
      }}
    />
  );
});

export default FieldText;
