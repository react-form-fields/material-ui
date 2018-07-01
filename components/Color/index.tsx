import TextField from '@material-ui/core/TextField/TextField';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import * as React from 'react';

import { ITextFieldProps } from '../../interfaces/props';
import PickerDialog from './PickerDialog';

interface IState extends IStateFieldBase {
  showPicker: boolean;
}

interface IProps extends ITextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default class FieldColor extends FieldCoreBase<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, showPicker: false };
  }

  setShowPicker = (showPicker: boolean) => {
    this.setState({ showPicker });
  }

  onChange = (event: any) => {
    this.setState({ touched: true });
    this.props.onChange(event.hex);
  }

  render() {
    const { showPicker } = this.state;
    const { value, helperText, multiline, validationContext, ...extraProps } = this.props;

    return (
      <React.Fragment>
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
            onChange: this.onChange,
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
      </React.Fragment>
    );
  }
}