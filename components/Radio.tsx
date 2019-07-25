import Radio from '@material-ui/core/Radio/Radio';
import * as React from 'react';

import { RadioPropsResolver } from '../interfaces/props';
import FieldSelectionBase, { IPropsSelectionBase } from './Abstract/SelectionBase';

export default class FieldRadio extends React.PureComponent<RadioPropsResolver & IPropsSelectionBase> {
  render() {
    return (
      <FieldSelectionBase
        {...this.props}
        ref={null}
        Component={Radio}
      />
    );
  }
}