import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment, PureComponent } from 'react';

import Form from './Form';

export default class DevPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <Toolbar title='Dev Page' />

        <Form />
      </Fragment>
    );
  }
}