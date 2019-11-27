import ValidationContext, { IValidationContextRef } from '@react-form-fields/core/ValidationContext';
import * as React from 'react';

interface IProps extends React.Props<IFormValidationRef> {
  onSubmit: (valid: boolean) => void;
  className?: string;
}

export interface IFormValidationRef {
  isValid(formSubmitted?: boolean): Promise<boolean>;
  reset(): void;
}

const FormValidation = React.memo(
  React.forwardRef<IFormValidationRef, IProps>((props, ref) => {
    const validationContext = React.useRef<IValidationContextRef>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        isValid: (formSubmitted: boolean = true) => validationContext.current.isValid(formSubmitted),
        reset: () => validationContext.current.reset()
      }),
      []
    );

    const onSubmit = React.useCallback(
      async (e?: React.SyntheticEvent) => {
        e && e.preventDefault && e.preventDefault();
        e && e.stopPropagation && e.stopPropagation();

        const isValid = await validationContext.current.isValid(true);
        props.onSubmit(isValid);
      },
      [props]
    );

    return (
      <form noValidate onSubmit={onSubmit} className={props.className}>
        <ValidationContext ref={validationContext}>{props.children}</ValidationContext>
      </form>
    );
  })
);

export default FormValidation;
