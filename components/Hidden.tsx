import Typography from '@material-ui/core/Typography/Typography';
import FieldCoreBase, { IPropsFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import * as React from 'react';

interface IProps extends IPropsFieldBase {
  value: any;
  onChange?: never;
}

export default class FieldHidden extends FieldCoreBase<IProps> {
  render() {
    return (
      <React.Fragment>
        {super.render()}
        {!!this.errorMessage &&
          <Typography color='error'>
            {this.errorMessage}
          </Typography>
        }
      </React.Fragment>
    );
  }
}