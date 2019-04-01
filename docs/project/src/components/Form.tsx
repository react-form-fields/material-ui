import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import FieldAutocomplete from '@react-form-fields/material-ui/components/Autocomplete';
import FieldCheckbox from '@react-form-fields/material-ui/components/Checkbox';
import FieldColor from '@react-form-fields/material-ui/components/Color';
import CustomMessage from '@react-form-fields/material-ui/components/CustomMessage';
import FieldDate from '@react-form-fields/material-ui/components/Date';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldHidden from '@react-form-fields/material-ui/components/Hidden';
import FieldHtml from '@react-form-fields/material-ui/components/Html';
import FieldRadio from '@react-form-fields/material-ui/components/Radio';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';
import FieldText from '@react-form-fields/material-ui/components/Text';
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
      model: {},
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
    const { model, message, array, validationOnChange } = this.state;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.formValidation}>

        <FieldSwitch
          label={`Validation on ${validationOnChange ? 'Change' : 'Blur'}`}
          checked={validationOnChange}
          onChange={this.handleValidationOn}
        />

        <Card style={{ overflow: 'visible' }}>
          <CardContent>
            <FieldText
              label='Name'
              name='name'
              value={model.name}
              validation='required'
              onChange={(v => this.setState({ model: { ...model, name: v } }))}
            />

            <Grid container spacing={24}>

              <Grid item xs={12} sm={6}>
                <FieldText
                  label='Email'
                  name='email'
                  value={model.email}
                  validation='required|email'
                  onChange={(v => this.setState({ model: { ...model, email: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldSelect
                  label='Select'
                  name='select'
                  value={model.comboId}
                  validation='required'
                  emptyOption='Select one option...'
                  options={[{ value: 1, label: 'Combo 1' }, { value: 2, label: 'Combo 2' }, { value: 3, label: 'Combo 3' }]}
                  onChange={(v => this.setState({ model: { ...model, comboId: v } }))}
                />
              </Grid>

            </Grid>

          </CardContent>
          <Divider />
          <CardContent>

            <Grid container>

              <Grid item xs={12} sm={4}>
                <FieldCheckbox
                  label='I agreed to receive spam'
                  checked={model.spam}
                  onChange={(v => this.setState({ model: { ...model, spam: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FieldSwitch
                  label='Yep! I Do'
                  checked={model.spam}
                  onChange={(v => this.setState({ model: { ...model, spam: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FieldCheckbox
                  value='selected!'
                  checked={model.checkValue}
                  onChange={(v => this.setState({ model: { ...model, checkValue: v } }))}
                >
                  <Typography>Children!</Typography>
                  <Typography variant='caption'>Check Value: {model.checkValue}</Typography>
                </FieldCheckbox>
              </Grid>

            </Grid>

          </CardContent>
          <Divider />
          <CardContent>

            <Grid container>

              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Radio 1'
                  value='1'
                  checked={model.radio === '1'}
                  onChange={(v => this.setState({ model: { ...model, radio: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Radio 2'
                  value='2'
                  checked={model.radio === '2'}
                  onChange={(v => this.setState({ model: { ...model, radio: v } }))}
                />
              </Grid>

            </Grid>

          </CardContent>
          <Divider />
          <CardContent>
            <Grid container>

              <Grid item>
                <Button onClick={() => this.setState({ array: [...array, 'data'] })}>+</Button>
                <Typography style={{ display: 'inline' }}>{array.length}</Typography>
                <Button onClick={() => this.setState({ array: array.slice(1) })}>-</Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>Hidden Array min 3</Typography>
                <Typography variant='caption'>(usefull for manual data check, ex. Array length)</Typography>

                <FieldHidden
                  name='array'
                  value={array.length}
                  validation='required|numeric|min:3'
                >
                  <CustomMessage rules='min'>Custom message: Array.length > 2</CustomMessage>
                </FieldHidden>
              </Grid>

            </Grid>

          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant='subheading'>Complex Components</Typography>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='Begin Date'
                  name='begin'
                  value={model.beginDate}
                  validation='date'
                  onChange={(v => this.setState({ model: { ...model, beginDate: v } }))}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='End Date'
                  name='end'
                  value={model.endDate}
                  validation='date|after_or_equal:begin date'
                  validationContext={{ 'begin date': model.beginDate }}
                  onChange={(v => this.setState({ model: { ...model, endDate: v } }))}
                />
              </Grid>
            </Grid>

            <FieldColor
              label='Color'
              name='color'
              value={model.color}
              validation='required'
              onChange={(v => this.setState({ model: { ...model, color: v } }))}
            />

            <FieldAutocomplete
              label='Autocomplete'
              helperText='If you try to '
              name='autocomplete'
              value={model.autocompleteId}
              validation='required'
              options={[{ value: 1, label: 'Auto 1' }, { value: 2, label: 'Auto 2' }, { value: 3, label: 'Auto 3' }]}
              onChange={(v => this.setState({ model: { ...model, autocompleteId: v } }))}
            />

            <FieldAutocomplete
              label='Autocomplete Multi'
              helperText='If you try to '
              name='autocomplete'
              value={model.autocompleteId2}
              validation='required'
              options={[{ value: 1, label: 'Auto 1' }, { value: 2, label: 'Auto 2' }, { value: 3, label: 'Auto 3' }]}
              isMulti
              onChange={(v => this.setState({ model: { ...model, autocompleteId2: v } }))}
            />

            <FieldHtml
              label='HTML'
              name='html'
              placeholder='Your content'
              value={model.html}
              validation='required'
              onChange={(v => this.setState({ model: { ...model, html: v } }))}
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
}