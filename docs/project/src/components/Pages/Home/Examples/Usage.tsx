import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import React, { PureComponent } from 'react';

interface IState {
  model: any;
  message: string;

}

export default class HomeExampleUsage extends PureComponent<{}, IState> {
  formValidation = React.createRef<FormValidation>();

  constructor(props: {}) {
    super(props);

    this.state = {
      model: {},
      message: null,
    };
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

  render() {
    const { model, message } = this.state;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.formValidation}>

        <Card style={{ overflow: 'visible' }}>
          <CardContent>
            <Typography>{message}</Typography>

            <FieldText
              label='Name'
              value={model.name}
              validation='required'
              onChange={(v => this.setState({ model: { ...model, name: v } }))}
            />

            <Grid container spacing={24}>

              <Grid item xs={12} sm={6}>
                <FieldText
                  label='Email'
                  value={model.email}
                  validation='required|email'
                  onChange={(v => this.setState({ model: { ...model, email: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldSelect
                  label='Select'
                  value={model.comboId}
                  validation='required'
                  emptyOption='Select one option...'
                  options={[{ value: 1, label: 'Combo 1' }, { value: 2, label: 'Combo 2' }, { value: 3, label: 'Combo 3' }]}
                  onChange={(v => this.setState({ model: { ...model, comboId: v } }))}
                />
              </Grid>
            </Grid>

          </CardContent>

          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button onClick={this.handleClear}>Clear</Button>
            <Button type='submit' color='secondary' variant='contained'>Save</Button>
          </CardActions>
        </Card>

      </FormValidation>
    );
  }
}