import { Switch } from '@material-ui/core';
import { PureComponent } from 'react';
import React from 'react';

import { IPropsFieldBase } from './Base';
import FieldSelectionBase from './BaseSelection';

interface IProps extends IPropsFieldBase {
  value?: any;
  checked: boolean;
  helperText?: React.ReactNode;
  onChange: (value: any) => void;
}

export default class FieldSwitch extends PureComponent<IProps> {
  render() {
    return <FieldSelectionBase
      {...this.props}
      value={this.props.value || null}
      Component={Switch}
    />;
  }
}