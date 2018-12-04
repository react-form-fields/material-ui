import { SelectProps } from '@material-ui/core/Select';
import { TextFieldProps } from '@material-ui/core/TextField';
import { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { SyntheticEvent } from 'react';

export type TextFieldPropsResolver = {
  [K in Exclude<keyof TextFieldProps, keyof IPropsFieldBase | keyof IBaseFieldProps>]?: TextFieldProps[K]
};

export type SelectPropsResolver = {
  [K in Exclude<keyof SelectProps, keyof IPropsFieldBase | keyof IBaseFieldProps | 'displayEmpty' | 'placeholder'>]?: SelectProps[K]
};

export interface IBaseFieldProps extends IPropsFieldBase {
  label: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: (ev: SyntheticEvent) => void;
  classes?: any;
}