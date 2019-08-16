import FormCode from '!raw-loader!./Form';
import Toolbar from 'components/Layout/Toolbar';
import Code from 'components/Shared/Code';
import CodeExpansion from 'components/Shared/CodeExpansion';
import React, { Fragment, PureComponent } from 'react';

import Form from './Form';

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