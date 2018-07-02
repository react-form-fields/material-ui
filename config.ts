import * as coreConfig from '@react-form-fields/core/config';

export interface IConfig extends coreConfig.IConfig {
  dateLocale?: string;
}

export function getConfig(): IConfig {
  return coreConfig.getConfig() || {};
}

export function setConfig(config: IConfig) {
  coreConfig.setConfig(config);
}