import FormControl from '@material-ui/core/FormControl';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';
import Select from 'react-select';
import { Props as AutoCompleteProps } from 'react-select/lib/Select';
import { StylesConfig } from 'react-select/lib/styles';

import { IStyledProps, WithStyles } from '../../decorators/withStyles';
import { IBaseFieldProps } from '../../interfaces/props';
import components from './components';
import styles from './styles';

interface IState extends IStateFieldBase {
  term: string;
  value: string;
  suggestions: IProps['options'][0][];
}

//@ts-ignore
interface IProps extends IBaseFieldProps, IStyledProps, AutoCompleteProps {
  value: any | any[];
  onChange: (value: any) => void;
  options: { value: any, label: string }[];
}

@WithStyles(styles, { withTheme: true })
export default class FieldAutocomplete extends FieldCoreBase<IProps, IState> {
  styles: StylesConfig = {
    input: base => ({
      ...base,
      color: this.props.theme.palette.text.primary,
      '& input': { font: 'inherit', },
    }),
  };

  onChange = (value: IProps['options'] | IProps['options'][0]) => {
    this.setState({ showError: true });
    this.props.onChange(Array.isArray(value) ? value.map(o => o.value) : value.value);
  }

  get value() {
    const value = this.props.value;
    return Array.isArray(value) ? this.props.options.filter(o => value.some(v => o.value == v)) : (value || {}).value;
  }

  render() {
    const { classes, theme, options, value, label, onChange, placeholder, ...extraProps } = this.props;

    return (
      <div className={classes.root}>
        <ValidationContextRegister field={this} />

        <FormControl margin={extraProps.margin || 'normal'} fullWidth error={!!this.errorMessage} variant={extraProps.variant}>
          <Select
            classes={classes}
            styles={this.styles}
            textFieldProps={{
              label,
              InputLabelProps: { shrink: true },
            }}
            {...extraProps}
            options={options}
            components={components}
            value={this.value}
            onChange={this.onChange}
            placeholder={placeholder}
          />
        </FormControl>
      </div>
    );
  }
}