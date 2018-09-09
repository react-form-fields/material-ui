import * as coreConfig from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    dateLocale?: any;
    dateFormat?: string;
    validationOn?: 'onChange' | 'onBlur' | 'onSubmit';
  }
}

const defaultConfig: coreConfig.IConfig = {
  validationOn: 'onChange',
  dateFormat: 'dd/MM/yyyy'
}

export function getConfig(): coreConfig.IConfig {
  return {
    ...defaultConfig,
    ...(coreConfig.getConfig() || {})
  };
}

export function setConfig(config: coreConfig.IConfig) {
  coreConfig.setConfig(config);
}