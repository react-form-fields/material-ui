import HomeExampleSimpleCode from '!raw-loader!./Examples/Simple';
import HomeExampleUsageCode from '!raw-loader!./Examples/Usage';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import Code from 'components/Shared/Code';
import CodeExpansion from 'components/Shared/CodeExpansion';
import SectionTitle from 'components/Shared/SectionTitle';
import React, { Fragment, PureComponent } from 'react';

import HomeExampleUsage from './Examples/Usage';

export default class HomePage extends PureComponent {
  render() {
    return (
      <Fragment>
        <Toolbar title='Getting Started' />

        <SectionTitle title='Requirements' />
        <ul>
          <li><Typography>React >= 16.6.0</Typography></li>
          <li><Typography>Material-ui >= 3.0.0</Typography></li>
        </ul>

        <SectionTitle title='Instalation' />
        <Code content={`yarn add @react-form-fields/material-ui`} lang='plaintext' />

        <SectionTitle title='Usage' />

        <Code content={HomeExampleSimpleCode} />

        <CodeExpansion title='Example'>
          <Code content={HomeExampleUsageCode} />
        </CodeExpansion>

        <HomeExampleUsage />

      </Fragment>
    );
  }
}