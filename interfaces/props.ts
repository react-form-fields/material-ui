import { SelectProps } from '@material-ui/core/Select';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal';
import { HTMLAttributes, SyntheticEvent } from 'react';
import { Props as AutoCompleteProps } from 'react-select/lib/Select';

import { IStyledProps } from '../decorators/withStyles';

export type TextFieldPropsResolver = {
  [K in Exclude<keyof TextFieldProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: TextFieldProps[K]
};

export type SelectPropsResolver = {
  [K in Exclude<keyof SelectProps, keyof IPropsFieldBase | keyof IBaseFieldProps | 'displayEmpty' | 'placeholder'>]?: SelectProps[K]
};

export type DatePropsResolver = {
  [K in Exclude<keyof DatePickerModalProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: DatePickerModalProps[K]
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