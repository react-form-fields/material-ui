import './App.css';

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  CustomMessage,
  FieldAutocomplete,
  FieldCheckbox,
  FieldColor,
  FieldDate,
  FieldHidden,
  FieldRadio,
  FieldSelect,
  FieldSwitch,
  FieldText,
  setConfig,
  ValidationContext,
} from '@react-form-fields/material-ui';
import { CloseIcon, CodeTagsIcon, GithubCircleIcon } from 'mdi-react';
import * as React from 'react';

export default class App extends React.Component {
  state = {
    array: [] as string[],
    model: {} as any,
    message: null as string
  };
  validationContext: any;

  onSubmit = (event: any) => {
    event.preventDefault();

    const isValid = this.validationContext.isValid();
    const message = isValid ? `It's valid broto!` : `Invalid, sorry`;

    this.setState({ message });
  }

  handleClear = () => {
    this.validationContext.reset();
    this.setState({ model: {}, message: null });
  }

  handleSnackbarClose = () => {
    this.setState({ message: null });
  }

  render() {
    const { model, message, array } = this.state;

    return (
      <div className='root'>
        <CssBaseline />
        <AppBar elevation={1}>
          <Toolbar>
            <Grid container spacing={24} style={{ alignItems: 'center' }}>
              <Grid item xs={true}>
                <Typography variant='title' color='inherit'>Material UI Form Fields</Typography>
              </Grid>
              <Grid item xs={false}>
                <Tooltip title='Sample code'>
                  <IconButton color='inherit' target='_blank' href='https://github.com/react-form-fields/material-ui/blob/master/docs/project/src/App.tsx'>
                    <CodeTagsIcon size={30} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={false}>
                <Tooltip title='Github'>
                  <IconButton color='inherit' target='_blank' href='https://github.com/react-form-fields/material-ui'>
                    <GithubCircleIcon size={30} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <form onSubmit={this.onSubmit} noValidate>
          <Card style={{ overflow: 'visible' }}>
            <ValidationContext ref={(ref: any) => this.validationContext = ref}>
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
                      label="Radio 2"
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

              </CardContent>
            </ValidationContext>

            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Button onClick={this.handleClear}>Clear</Button>
              <Button type='submit' color='secondary' variant='raised'>Save</Button>
            </CardActions>
          </Card>

          <Snackbar
            open={!!message}
            onClose={this.handleSnackbarClose}
            message={message as any}
            action={[
              <IconButton color="inherit" onClick={this.handleSnackbarClose}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </form>
      </div>
    );
  }
}