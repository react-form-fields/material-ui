import FieldValidationConfigContextCore from '@react-form-fields/core/ConfigProvider';

export { IConfig } from '@react-form-fields/core/ConfigProvider';

declare module '@react-form-fields/core/ConfigProvider/context' {
  interface IConfig {
    dateLocale?: Locale;
    dateFormat?: string;
    timeFormat?: string;
    dateTimeFormat?: string;
    dateLabels?: {
      clear: string;
      ok: string;
      cancel: string
    };
    trumbowyg?: {
      loadLocale?: () => Promise<any>;
      loadPlugins?: () => Promise<any>[];
      config?: any;
    };
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
  }
}

const FieldValidationConfigContext = FieldValidationConfigContextCore;
export default FieldValidationConfigContext;
