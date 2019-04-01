import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import { getConfig } from '@react-form-fields/core/config';
import * as React from 'react';

import { WithStyles } from '../../decorators/withStyles';
import { IBaseFieldProps } from '../../interfaces/props';

interface IState extends IStateFieldBase {
  focused: boolean;
}

interface IProps extends IBaseFieldProps {
  helperText?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

@WithStyles(theme => ({
  label: {
    display: 'block',
    marginBottom: 5
  },
  fullWrapper: {
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.27)' : 'rgba(255, 255, 255, 0.7)',
  },
  editorWrapper: {
    ...theme.typography.body1
  }
}))
export default class FieldHtml extends FieldCoreBase<IProps, IState> {

  onChange = (value: any) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  onBlur = (e: React.SyntheticEvent) => {
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
    this.setState({ focused: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  render() {
    const { focused } = this.state;
    const { classes, label, helperText } = this.props;
    /* disabled, onChange, onBlur, placeholder */

    return (
      <div>

        <ValidationContextRegister field={this} />

        <div className={classes.label}>
          <InputLabel error={!!this.errorMessage} required={this.isRequired} focused={focused}>{label}</InputLabel>
          {helperText || this.errorMessage ?
            <Typography variant='caption' color={this.errorMessage ? 'error' : 'default'}>
              {this.errorMessage || helperText}
            </Typography>
            : null
          }
        </div>

      </div>
    );
  }
}