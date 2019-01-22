import * as coreConfig from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    dateLocale?: Locale;
    dateFormat?: string;
    dateLabels?: {
      clear: string;
      ok: string;
      cancel: string
    };
    editorLocale?: string;
    editorToolbar?: object;
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
  }
}

const defaultConfig: coreConfig.IConfig = {
  validationOn: 'onChange',
  dateFormat: 'yyyy-MM-dd',
  dateLabels: {
    clear: 'Clear',
    ok: 'Ok',
    cancel: 'Cancel'
  }
};

export function getConfig(): coreConfig.IConfig {
  return {
    ...defaultConfig,
    ...(coreConfig.getConfig() || {})
  };
}

export function setConfig(config: coreConfig.IConfig) {
  coreConfig.setConfig(config);
}