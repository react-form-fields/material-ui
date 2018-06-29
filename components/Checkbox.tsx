import { Checkbox } from '@material-ui/core';
import { PureComponent } from 'react';
import React from 'react';

import { IPropsFieldBase } from './Base';
import FieldSelectionBase from './BaseSelection';

interface IProps extends IPropsFieldBase {
  value?: any;
  onChange: (value: any) => void;
  checked: boolean;
  helperText?: React.ReactNode;
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