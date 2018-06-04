import React, { PureComponent } from 'react';

import { FieldValidation, IFieldValidationContext } from '../validator/context';
import FieldBase from './Base';

interface IState {
  formSubmitted: boolean;
}

export default class ValidationContext extends PureComponent<{}, IState> {
  public fields: FieldBase<any, any>[];
  private registerFields: IFieldValidationContext = {
    bind: field => {
      this.fields.push(field);
    },
    unbind: field => {
      const index = this.fields.findIndex(f => f === field);
      this.fields.splice(index, 1);
    }
  };

  constructor(props: {}) {
    super(props);
    this.state = { formSubmitted: true };
  }

  public render(): React.ReactNode {
    return (
      <FieldValidation.Provider value={this.registerFields}>
        {this.props.children}
      </FieldValidation.Provider>
    )
  }

  public isValid(formSubmitted: boolean = true): boolean {
    this.fields.forEach(f => f.setFormSubmitted(formSubmitted));
    this.setState({ formSubmitted });

    return this.checkValidation();
  }

  private checkValidation(): boolean {
    if (!this.fields.length) {
      console.warn('material-ui-form-fields: There is no field registred');
    }

    return this.fields.every(f => f.isValid());
  }
}