import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

import FieldBase, { IPropsFieldBase } from './Base';

interface IProps extends IPropsFieldBase {
  onChange: never;
}

export default class FieldHidden extends FieldBase<IProps> {

  render() {
    return (
      <Fragment>
        {super.render()}
        {!!this.errorMessage &&
          <Typography color='error'>
            {this.errorMessage}
          </Typography>
        }
      </Fragment>
    );
  }
}