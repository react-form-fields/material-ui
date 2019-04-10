import { SelectProps } from '@material-ui/core/Select';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { DatePickerModalProps } from 'material-ui-pickers/DatePicker/DatePickerModal';
import { HTMLAttributes, SyntheticEvent } from 'react';

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

export interface IBaseFieldProps extends IPropsFieldBase {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: (ev: SyntheticEvent) => void;
  classes?: any;
}