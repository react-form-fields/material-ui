import Radio from '@material-ui/core/Radio/Radio';
import * as React from 'react';

import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldRadio extends React.PureComponent<IPropsSelectionBase> {
  render() {
    return (
      <FieldSelectionBase
        {...this.props}
        Component={Radio}
      />
    );
  }
}