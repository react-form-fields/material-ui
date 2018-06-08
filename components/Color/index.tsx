import { TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ColorResult } from 'react-color';

import FieldBase, { IPropsFieldBase, IStateFieldBase } from '../Base';
import PickerDialog from './PickerDialog';

interface IState extends IStateFieldBase {
  showPicker: boolean;
}

interface IProps extends IPropsFieldBase {
  onChange: (value: string) => void;
}

export default class FieldColor extends FieldBase<IProps, IState> {
  constructor(props: IPropsFieldBase) {
    super(props);
    this.state = { ...this.state, showPicker: false };
  }

  setShowPicker(showPicker: boolean) {
    this.setState({ showPicker });
  }

  onChange(e: ColorResult) {
    super.onChange(e.hex);
  }

  render() {
    const { showPicker } = this.state;
    const { value, helperText, multiline, validationContext, ...extraProps } = this.props;

    return (
      <Fragment>
        {super.render()}

        <TextField
          {...{
            fullWidth: true,
            margin: 'normal',
            ...extraProps,
            required: this.isRequired,
            value: (value === undefined || value === null ? '' : value).toString(),
            error: !!this.errorMessage,
            helperText: this.errorMessage || helperText,
            onChange: this.onChange.bind(this),
            submitted: null,
            touched: null,
            loading: null
          }}
          onClick={() => this.setShowPicker(true)}
          InputProps={{ style: { color: value } }}
        />
        {showPicker && (
          <PickerDialog
            value={value || ''}
            onDismiss={() => this.setShowPicker(false)}
            onChange={e => this.onChange(e)}
          />
        )}
      </Fragment>
    );
  }
}