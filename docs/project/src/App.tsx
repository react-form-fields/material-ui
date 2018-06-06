import './App.css';

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
  FieldAutocomplete,
  FieldCheckbox,
  FieldColor,
  FieldDate,
  FieldHtml,
  FieldSelect,
  FieldSwitch,
  FieldText,
  ValidationContext,
} from 'material-ui-form-fields';
import * as React from 'react';

export default class App extends React.Component {
  state: any = { model: {}, message: null };
  validationContext: any;

  onSubmit(event: any) {
    event.preventDefault();

    const isValid = this.validationContext.isValid();
    const message = isValid ? `It's valid broto!` : `Invalid, sorry`;

    this.setState({ message });
  }

  handleClear() {
    this.validationContext.reset();
    this.setState({ model: {}, message: null });
  }

  handleSnackbarClose() {
    this.setState({ message: null });
  }

  render() {
    const { model, message } = this.state;

    return (
      <div className='root'>
        <CssBaseline />
        <AppBar elevation={1}>
          <Toolbar>
            <Typography variant='title' color='inherit'>Material UI Form Fields</Typography>
          </Toolbar>
        </AppBar>

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <Card style={{ overflow: 'visible' }}>
            <CardContent>
              <ValidationContext ref={(ref: any) => this.validationContext = ref}>
                <FieldText
                  label='Name'
                  name='name'
                  value={model.name}
                  validation='required'
                  onChange={(v => this.setState({ model: { ...model, name: v } }))}
                />

                <FieldText
                  label='Email'
                  name='email'
                  value={model.email}
                  validation='required|email'
                  onChange={(v => this.setState({ model: { ...model, email: v } }))}
                />

                <FieldCheckbox
                  label='I agreed to receive spam'
                  checked={model.spam}
                  onChange={(v => this.setState({ model: { ...model, spam: v } }))}
                />

                <FieldSwitch
                  label='Yep! I Do'
                  checked={model.spamConfirm}
                  onChange={(v => this.setState({ model: { ...model, spamConfirm: v } }))}
                />

                <FieldSelect
                  label='Combo'
                  name='combo'
                  value={model.comboId}
                  validation='required'
                  options={[{ value: 1, label: 'Combo 1' }, { value: 2, label: 'Combo 2' }, { value: 3, label: 'Combo 3' }]}
                  onChange={(v => this.setState({ model: { ...model, comboId: v } }))}
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

                <FieldColor
                  label='Color'
                  name='color'
                  value={model.color}
                  validation='required'
                  onChange={(v => this.setState({ model: { ...model, color: v } }))}
                />

                <Grid container spacing={24}>
                  <Grid item xs={true}>
                    <FieldDate
                      label='Begin Date'
                      name='begin'
                      value={model.beginDate}
                      validation='date'
                      onChange={(v => this.setState({ model: { ...model, beginDate: v } }))}
                    />
                  </Grid>

                  <Grid item xs={true}>
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

                <FieldHtml
                  label='Html'
                  name='html'
                  value={model.html}
                  validation='required'
                  onChange={(v => this.setState({ model: { ...model, html: v } }))}
                />

              </ValidationContext>

            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Button onClick={this.handleClear.bind(this)}>Clear</Button>
              <Button type='submit' color='secondary' variant='raised'>Save</Button>
            </CardActions>
          </Card>

          <Snackbar
            open={!!message}
            onClose={this.handleSnackbarClose.bind(this)}
            message={message}
            action={[
              <IconButton color="inherit" onClick={this.handleSnackbarClose.bind(this)}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </form>
      </div>
    );
  }
}