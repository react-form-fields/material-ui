import { TextFieldProps } from '@material-ui/core/TextField';
import React, { PureComponent } from 'react';
import { ErrorMessages } from 'validatorjs';

import { validate } from '../validator';
import { FieldValidation, IFieldValidationContext } from '../validator/context';
import CustomMessage from './CustomMessage';

export interface IStateFieldBase {
  touched: boolean;
  errorMessage: string;
  submitted: boolean;
}

export interface IPropsFieldBase extends TextFieldProps {
  disabled?: boolean;
  value?: any;
  classes?: any;
  validation?: string;
  validationContext?: Object;
  errorMessage?: string;
  onChange?: (value: any) => void;
}

export default abstract class FieldBase<
  P extends IPropsFieldBase = IPropsFieldBase,
  S extends IStateFieldBase = IStateFieldBase
  > extends PureComponent<P, S> {

  protected validationContext: IFieldValidationContext;

  constructor(props: any) {
    super(props);
    this.state = { touched: false, error: null } as any;
  }

  get errorMessage() {
    const { errorMessage: errorProp } = this.props;
    const { submitted, touched, errorMessage } = this.state;

    return submitted || touched ?
      errorProp || errorMessage : null;
  }

  get isRequired() {
    return (this.props.validation || '').includes('required');
  }

  static getDerivedStateFromProps({ name, value, validation, validationContext, children }: IPropsFieldBase, currentState: IStateFieldBase): IStateFieldBase {
    const customMessages = React.Children
      .toArray(children)
      .reduce<ErrorMessages>((acc, child: any) => {
        if (child.type === CustomMessage) {
          child.props.rules.split(',').forEach((rule: string ) => {
            acc[rule] = child.props.children;
          });
        }

        return acc;
      }, {});

    const error = validate(name, value, validation, validationContext, customMessages);

    return {
      ...currentState,
      errorMessage: error.message
    };
  }

  public componentWillUnmount() {
    this.validationContext && this.validationContext.unbind(this);
  }

  public setFormSubmitted = (submitted: boolean) => {
    this.setState({ submitted });
  }

  public isValid = () => {
    return !this.state.errorMessage && !this.props.errorMessage;
  }

  public setContext = (newContext: IFieldValidationContext): React.ReactNode => {
    if (newContext === this.validationContext) return null;

    this.validationContext && this.validationContext.unbind(this);

    if (newContext) {
      this.validationContext = newContext;
      this.validationContext.bind(this);
    }

    return null;
  }

  public render() {
    return (
      <FieldValidation.Consumer>
        {context => this.setContext(context)}
      </FieldValidation.Consumer>
    );
  }
}