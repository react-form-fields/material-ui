import * as coreConfig from '@react-form-fields/core/config';

type DateFnsLocale = any;

export interface IConfig extends coreConfig.IConfig {
  dateLocale?: DateFnsLocale;
}

export function getConfig(): IConfig {
  return coreConfig.getConfig() || {};
}

export function setConfig(config: IConfig) {
  coreConfig.setConfig(config);
}