import Switch from '@material-ui/core/Switch/Switch';
import * as React from 'react';

import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldSwitch extends React.PureComponent<IPropsSelectionBase> {
  render() {
    return <FieldSelectionBase
      {...this.props}
      value={this.props.value || null}
      Component={Switch}
    />;
  }
}