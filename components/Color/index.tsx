import TextField from '@material-ui/core/TextField/TextField';
import ColorIndicator from '@material-ui/icons/Stop';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';

import { getConfig } from '../../config';
import { IBaseFieldProps, TextFieldPropsResolver } from '../../interfaces/props';
import PickerDialog from './PickerDialog';

interface IState extends IStateFieldBase {
  showPicker: boolean;
}

interface IProps extends IBaseFieldProps, TextFieldPropsResolver {
}

export default class FieldColor extends FieldCoreBase<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, showPicker: false };
  }

  showPicker = () => this.setState({ showPicker: true });
  hidePicker = () => this.setState({ showPicker: false });

  onChange = (event: any) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(event.hex);
  }

  onBlur = (e: any) => {
    this.props.onBlur && this.props.onBlur(e);
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
  }

  render() {
    const { showPicker } = this.state;
    const { value, helperText, multiline, validationContext, InputProps, ...extraProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <TextField
          {...{
            fullWidth: true,
            margin: 'normal',
            ...(extraProps) as any,
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
          onClick={this.showPicker}
          InputProps={{
            startAdornment: <ColorIndicator color='inherit' style={{ color: value }} />,
            ...(InputProps || {})
          }}
        />
        {showPicker && (
          <PickerDialog
            value={value || ''}
            onDismiss={this.hidePicker}
            onChange={this.onChange}
          />
        )}
      </React.Fragment>
    );
  }
}