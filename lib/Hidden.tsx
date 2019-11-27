import Typography from '@material-ui/core/Typography';
import useValidation from '@react-form-fields/core/hooks/useValidation';
import { IPropsFieldBase } from '@react-form-fields/core/interfaces/props';
import * as React from 'react';

export interface IFieldHiddenProps extends IPropsFieldBase {}

const FieldHidden = React.memo((props: IFieldHiddenProps) => {
  const { showError, errorMessage } = useValidation(props);

  return (
    <React.Fragment>
      <input type='hidden' value={props.value ?? ''} name={props.name} />
      {showError && <Typography color='error'>{errorMessage}</Typography>}
    </React.Fragment>
  );
});

FieldHidden.displayName = 'FieldHidden';
export default FieldHidden;
