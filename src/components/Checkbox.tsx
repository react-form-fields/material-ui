import { Checkbox } from '@material-ui/core';
import { PureComponent } from 'react';
import React from 'react';

import { IPropsFieldBase } from './Base';
import FieldSelectionBase from './BaseSelection';

interface IProps extends IPropsFieldBase {
  checked: boolean;
  helperText?: React.ReactNode;
  classes?: any;
  onChange: (value: boolean) => void;
}

export default class FieldCheckbox extends PureComponent<IProps> {
  render() {
    return <FieldSelectionBase
      {...this.props}
      Component={Checkbox}
    />;
  }
}