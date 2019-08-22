import Switch from '@material-ui/core/Switch/Switch';
import * as React from 'react';

import { SwitchPropsResolver } from '../interfaces/props';
import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldSwitch extends React.PureComponent<SwitchPropsResolver & IPropsSelectionBase> {
  render() {
    return (
      <FieldSelectionBase
        {...this.props}
        ref={null}
        value={this.props.value || null}
        Component={Switch}
      />
    );
  }
}