import { TextFieldProps } from '@material-ui/core/TextField';
import { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';

type TextFieldPropsResolver = {
  [K in Exclude<keyof TextFieldProps, keyof IPropsFieldBase | 'classes'>]: TextFieldProps[K]
};

export interface ITextFieldProps extends IPropsFieldBase, TextFieldPropsResolver {
  value: any;
  onChange: (value: any) => void;
  classes?: any;
}