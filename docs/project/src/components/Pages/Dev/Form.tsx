import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import FieldAutocomplete from '@react-form-fields/material-ui/components/Autocomplete';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';
import { setConfig } from '@react-form-fields/material-ui/config';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { PureComponent } from 'react';

interface IState {
  array: string[];
  model: any;
  message: string;
  validationOnChange: boolean;

}

export default class Form extends PureComponent<{}, IState> {
  formValidation: React.RefObject<FormValidation>;

  constructor(props: {}) {
    super(props);

    this.formValidation = React.createRef();

    this.state = {
      array: [],
      model: { autocompleteId: [1] },
      message: null,
      validationOnChange: true
    };
  }

  handleValidationOn = (validationOnChange: boolean) => {
    this.setState({ validationOnChange });
    setConfig({ validationOn: validationOnChange ? 'onChange' : 'onBlur' });
    this.formValidation.current.reset();
  }

  onSubmit = (isValid: boolean) => {
    event.preventDefault();
    const message = isValid ? `It's valid broto!` : `Invalid, sorry`;

    this.setState({ message });
  }

  handleClear = () => {
    this.formValidation.current.reset();
    this.setState({ model: {}, message: null });
  }

  handleSnackbarClose = () => {
    this.setState({ message: null });
  }

  render() {
    const { model, message, validationOnChange } = this.state;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.formValidation}>

        <FieldSwitch
          label={`Validation on ${validationOnChange ? 'Change' : 'Blur'}`}
          checked={validationOnChange}
          onChange={this.handleValidationOn}
        />

        <Card style={{ overflow: 'visible' }}>
          <CardContent>
            <FieldAutocomplete
              label='Autocomplete'
              helperText='If you try to '
              name='autocomplete'
              placeholder='Test'
              isMulti
              value={model.autocompleteId}
              validation='required'
              options={[{ value: 1, label: 'Auto 1' }, { value: 2, label: 'Auto 2' }, { value: 3, label: 'Auto 3' }]}
              onChange={(v => this.setState({ model: { ...model, autocompleteId: v } }))}
            />
          </CardContent>

          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button onClick={this.handleClear}>Clear</Button>
            <Button type='submit' color='secondary' variant='contained'>Save</Button>
          </CardActions>
        </Card>

        <Snackbar
          open={!!message}
          onClose={this.handleSnackbarClose}
          message={<span>{message}</span>}
          action={[
            <IconButton key='1' color='inherit' onClick={this.handleSnackbarClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </FormValidation>
    );
  }
  // tslint:disable-next-line:max-file-line-count
}