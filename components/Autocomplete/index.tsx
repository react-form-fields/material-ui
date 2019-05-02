import FormControl from '@material-ui/core/FormControl';
import { TextFieldProps } from '@material-ui/core/TextField';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';
import Select from 'react-select';
import { StylesConfig } from 'react-select/lib/styles';

import { IStyledProps, WithStyles } from '../../decorators/withStyles';
import { AutoCompletePropsResolver, IBaseFieldProps } from '../../interfaces/props';
import components from './components';
import styles from './styles';

interface IState extends IStateFieldBase {
  term: string;
  value: string;
  suggestions: IProps['options'][0][];
  focused: boolean;
}

interface IProps extends IBaseFieldProps, IStyledProps, AutoCompletePropsResolver {
  value: any | any[];
  placeholder?: string;
  onChange: (value: any) => void;
  options: { value: any, label: string }[];
  TextFieldProps?: TextFieldProps;
  helperText?: string;
  margin?: TextFieldProps['margin'];
  variant?: TextFieldProps['variant'];
  disabled?: boolean;
}

@WithStyles(styles, { withTheme: true })
export default class FieldAutocomplete extends FieldCoreBase<IProps, IState> {
  styles: StylesConfig = {
    input: base => ({
      ...base,
      color: this.props.theme.palette.text.primary,
      '& input': { font: 'inherit', },
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  onChange = (value: IProps['options'] | IProps['options'][0]) => {
    this.setState({ showError: true });
    if (!value) return this.props.onChange(null);
    this.props.onChange(Array.isArray(value) ? value.map(o => o.value) : value.value);
  }

  onFocus = (e: any) => {
    this.setState({ focused: true });
    this.props.onFocus && this.props.onFocus(e);
  }

  onBlur = (e: any) => {
    this.setState({ focused: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  get value() {
    const value = this.props.value;
    return Array.isArray(value) ? this.props.options.filter(o => value.some(v => o.value == v)) : this.props.options.find(o => value === o.value);
  }

  render() {
    const { focused } = this.state;
    const { classes, theme, options, value, label, onChange, helperText, disabled, placeholder, TextFieldProps, ...extraProps } = this.props;

    return (
      <div className={classes.root}>
        <ValidationContextRegister field={this} />

        <FormControl margin={extraProps.margin || 'normal'} fullWidth error={!!this.errorMessage} variant={extraProps.variant}>
          <Select
            classes={classes}
            styles={this.styles}
            menuPortalTarget={document.body}
            {...extraProps}
            textFieldProps={{
              label,
              InputLabelProps: { shrink: true },
              ...(TextFieldProps || {}),
              error: !!this.errorMessage,
              helperText: this.errorMessage || helperText,
            }}
            isDisabled={disabled}
            options={options}
            components={components}
            value={this.value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            placeholder={focused ? null : placeholder}
          />
        </FormControl>
      </div>
    );
  }
}