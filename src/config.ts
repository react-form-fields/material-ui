import { ErrorMessages } from 'validatorjs';

import { IMask, register as registerMasks } from './mask';
import * as validator from './validator';

let config: IConfig = {};

export interface IConfig {
  masks?: IMask[],
  validation?: {
    lang: string;
    customMessages?: ErrorMessages;
  }
  defaultDateLocale?: string;
}

export function getConfig(): IConfig {
  return config;
}

export function setConfig(customConfig: IConfig) {
  config = customConfig;

  registerMasks(customConfig.masks || []);
  configValidation(customConfig.validation);
}

function configValidation(config: IConfig['validation']) {
  if (config && config.customMessages) {
    validator.addLang(config.lang, config.customMessages);
  }

  validator.useLang(config.lang);
}
