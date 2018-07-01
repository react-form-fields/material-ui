import CustomMessageComponent from '@react-form-fields/core/components/CustomMessage';
import ValidationContextComponent from '@react-form-fields/core/components/ValidationContext';

import FieldAutocompleteComponent from './components/Autocomplete';
import FieldCheckboxComponent from './components/Checkbox';
import FieldColorComponent from './components/Color';
import FieldDateComponent from './components/Date';
import FieldHiddenComponent from './components/Hidden';
import FieldHtmlComponent from './components/Html';
import FieldRadioComponent from './components/Radio';
import FieldSelectComponent from './components/Select';
import FieldSwitchComponent from './components/Switch';
import FieldTextComponent from './components/Text';

export * from './config';

export const FieldColor = FieldColorComponent;
export const FieldText = FieldTextComponent;
export const FieldSelect = FieldSelectComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;
export const FieldDate = FieldDateComponent;
export const FieldAutocomplete = FieldAutocompleteComponent;
export const FieldHtml = FieldHtmlComponent;
export const FieldHidden = FieldHiddenComponent;

export const CustomMessage = CustomMessageComponent;
export const ValidationContext = ValidationContextComponent;