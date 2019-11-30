import { CheckboxProps } from '@material-ui/core/Checkbox';
import { RadioProps } from '@material-ui/core/Radio';
import { SelectProps } from '@material-ui/core/Select';
import { SwitchProps } from '@material-ui/core/Switch';
import { TextFieldProps } from '@material-ui/core/TextField';
import { DatePickerProps, DateTimePickerProps, TimePickerProps } from '@material-ui/pickers';
import { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { HTMLAttributes, SyntheticEvent } from 'react';
import { Props as AutoCompleteProps } from 'react-select/lib/Select';

import { IPropsSelectionBase } from '../components/Abstract/SelectionBase';
import { IStyledProps } from '../decorators/withStyles';

export type TextFieldPropsResolver = {
  [K in Exclude<keyof TextFieldProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: TextFieldProps[K]
};

export type SelectPropsResolver = {
  [K in Exclude<keyof SelectProps, keyof IPropsFieldBase | keyof IBaseFieldProps | 'placeholder'>]?: SelectProps[K]
};

export type DatePropsResolver = {
  [K in Exclude<keyof DatePickerProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: DatePickerProps[K]
};

export type TimePropsResolver = {
  [K in Exclude<keyof TimePickerProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: TimePickerProps[K]
};

export type DateTimePropsResolver = {
  [K in Exclude<keyof DateTimePickerProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: DateTimePickerProps[K]
};

export type SwitchPropsResolver = {
  [K in Exclude<keyof SwitchProps, keyof IPropsSelectionBase | keyof IBaseFieldProps>]?: SwitchProps[K]
};

export type CheckboxPropsResolver = {
  [K in Exclude<keyof CheckboxProps, keyof IPropsSelectionBase | keyof IBaseFieldProps>]?: CheckboxProps[K]
};

export type RadioPropsResolver = {
  [K in Exclude<keyof RadioProps, keyof IPropsSelectionBase | keyof IBaseFieldProps>]?: RadioProps[K]
};

export type HTMLAttributesResolver<T = any> = {
  [K in Exclude<keyof HTMLAttributes<T>, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: HTMLAttributes<T>[K]
};

type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

export type AutoCompletePropsResolver<T = any> = {
  [K in Exclude<KnownKeys<AutoCompleteProps<TextFieldProps>>, keyof IPropsFieldBase | keyof IBaseFieldProps | keyof IStyledProps | 'isDisabled'>]?: AutoCompleteProps<T>[K]
};

export interface IBaseFieldProps extends IPropsFieldBase {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: (ev: SyntheticEvent) => void;
  classes?: any;
}