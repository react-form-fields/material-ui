import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import * as React from 'react';

import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldCheckbox extends React.PureComponent<IPropsSelectionBase> {
  render() {
    return <FieldSelectionBase
      {...this.props}
      value={this.props.value || null}
      Component={Checkbox}
    />;
  }
}