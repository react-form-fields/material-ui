import { IConfig } from '@react-form-fields/core/config';
import coreLang from '@react-form-fields/core/lang/en-us';
import locale from 'date-fns/locale/en-US';

const langPTBR: IConfig = {
  ...coreLang,
  dateLocale: locale,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'hh:mm a',
  dateTimeFormat: 'MM/dd/yyyy hh:mm a',
  dateLabels: {
    cancel: 'Cancel',
    ok: 'Ok',
    clear: 'Clear'
  },
  trumbowyg: {
    loadLocale: () => Promise.resolve(),
    config: {}
  }
};

export default langPTBR;