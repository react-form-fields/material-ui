import { Checkbox } from '@material-ui/core';
import { PureComponent } from 'react';
import React from 'react';

import { IPropsFieldBase } from './Base';
import FieldSelectionBase from './BaseSelection';

// @ts-ignore
interface IProps extends IPropsFieldBase<boolean> {
  value?: void;
  checked: boolean;
  helperText?: React.ReactNode;
  classes?: any;
}

export default class FieldCheckbox extends PureComponent<IProps> {
  render() {
    return <FieldSelectionBase
      {...this.props}
      value={this.props.value || null}
      Component={Checkbox}
    />;
  }
}