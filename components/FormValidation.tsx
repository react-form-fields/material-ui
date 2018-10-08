import ValidationContext from '@react-form-fields/core/components/ValidationContext';
import * as React from 'react';

interface IProps {
  onSubmit: (valid: boolean) => void;
}

export class FormValidation extends React.PureComponent<IProps> {
  private validationContext: ValidationContext;

  private bindValidationContext = (validationContext: ValidationContext): void => {
    this.validationContext = validationContext;
  }

  private onSubmit = (e?: React.SyntheticEvent) => {
    e && e.preventDefault && e.preventDefault();

    const isValid = this.validationContext.isValid(true);
    this.props.onSubmit(isValid);
  }

  reset = () => {
    this.validationContext.reset();
  }

  render() {
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <ValidationContext ref={this.bindValidationContext}>
          {this.props.children}
        </ValidationContext>
      </form>
    );
  }
}