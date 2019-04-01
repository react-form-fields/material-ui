import Code from 'components/Code';
import Toolbar from 'components/Layout/Toolbar';
import SectionTitle from 'components/Shared/SectionTitle';
import React, { Fragment, PureComponent } from 'react';

export default class HomePage extends PureComponent {
  render() {
    return (
      <Fragment>
        <Toolbar title='Getting Started' />

        <SectionTitle title='Instalation' />

        <Code content='yarn add @react-form-fields/material-ui' lang='shell' />
      </Fragment>
    );
  }
}