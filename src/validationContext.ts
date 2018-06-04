import React from 'react';

import FieldBase from './components/Base';

export interface IFieldValidationContext {
  bind: (field: FieldBase<any, any>) => void;
  unbind: (field: FieldBase<any, any>) => void;
}

export const FieldValidation = React.createContext<IFieldValidationContext>(null);
