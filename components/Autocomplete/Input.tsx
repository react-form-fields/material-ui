import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props: any) {
  const { classes, ref, endAdornment, errorMessage, ...other } = props;

  return (
    <TextField
      fullWidth
      {...{
        fullWidth: true,
        margin: 'normal',
        ...other,
        error: !!errorMessage,
        helperText: errorMessage,
        submitted: null,
        touched: null
      }}
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        endAdornment
      }}
    />
  );
}