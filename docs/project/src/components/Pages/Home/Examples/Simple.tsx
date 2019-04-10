import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import React, { PureComponent } from 'react';

export default class HomeExampleSimple extends PureComponent {
  state = { name: '' };

  onSubmit = (isValid: boolean) => {
    //check isValid
  }

  render() {
    const { name } = this.state;

    return (
      // Creates the context and render a form, form validation is not required
      <FormValidation onSubmit={this.onSubmit}>
        <FieldText          // <~ render the input text field
          label='Name'
          validation='required' //<~ validation rules
          value={name}
          onChange={(value => this.setState({ name: value }))}
        />
      </FormValidation>
    );
  }
}