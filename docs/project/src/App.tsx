import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import { theme } from 'assets/theme';
import Pages from 'components/Pages';
import Toast from 'components/Shared/Toast';
import React, { Fragment, PureComponent } from 'react';

const fieldConfig = new ConfigBuilder()
  .build();

export default class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <FormFieldsContext config={fieldConfig}>
          <Fragment>
            <CssBaseline />

            <Toast.Global />

            <Pages />
          </Fragment>
        </FormFieldsContext>
      </MuiThemeProvider>
    );
  }
}