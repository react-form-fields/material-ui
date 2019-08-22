import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import * as React from 'react';

import { CheckboxPropsResolver } from '../interfaces/props';
import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldCheckbox extends React.PureComponent<CheckboxPropsResolver & IPropsSelectionBase> {
  render() {
    return (
      <FieldSelectionBase
        {...this.props}
        ref={null}
        value={this.props.value || null}
        Component={Checkbox}
      />
    );
  }
}