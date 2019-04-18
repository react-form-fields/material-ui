import * as coreConfig from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
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

const defaultConfig: coreConfig.IConfig = {
  validationOn: 'onChange',
  dateFormat: 'yyyy-MM-dd',
  dateLabels: {
    clear: 'Clear',
    ok: 'Ok',
    cancel: 'Cancel'
  },
  trumbowyg: {
    loadLocale: () => Promise.resolve(),
    loadPlugins: () => [],
    config: {}
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