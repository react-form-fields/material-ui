import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment, PureComponent } from 'react';

import Form from './Form';
import FormCode from '!raw-loader!./Form';
import CodeExpansion from 'components/Shared/CodeExpansion';
import Code from 'components/Shared/Code';

export default class FullFormPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <Toolbar title='Full Form Example' />

        <CodeExpansion>
          <Code content={FormCode} />
        </CodeExpansion>
        <Form />
      </Fragment>
    );
  }
}