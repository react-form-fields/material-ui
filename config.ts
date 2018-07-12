import * as coreConfig from '@react-form-fields/core/config';

declare module '@react-form-fields/core/config' {
  interface IConfig {
    dateLocale?: string;
  }
}

export function getConfig(): coreConfig.IConfig {
  return coreConfig.getConfig() || {};
}

export function setConfig(config: coreConfig.IConfig) {
  coreConfig.setConfig(config);
}