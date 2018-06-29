import { Switch } from '@material-ui/core';
import { PureComponent } from 'react';
import React from 'react';

import { IPropsFieldBase } from './Base';
import FieldSelectionBase from './BaseSelection';

interface IProps extends IPropsFieldBase {
  value?: never;
  checked: boolean;
  helperText?: React.ReactNode;
  onChange: (value: boolean) => void;
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