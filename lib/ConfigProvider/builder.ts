import CoreConfigBuilder from '@react-form-fields/core/ConfigProvider/builder';

import { IConfig } from '.';

export default class ConfigBuilder extends CoreConfigBuilder {
  public setDateConfig(locale: any, format: string, labels: IConfig['dateLabels']) {
    this.config = {
      ...this.config,
      dateLocale: locale,
      dateFormat: format,
      dateLabels: labels
    };

    return this;
  }

  public setTrumbowygLocale(loadLocale: IConfig['trumbowyg']['loadLocale']) {
    const currentConfig = this.config.trumbowyg || {};
    this.config = {
      ...this.config,
      trumbowyg: { ...currentConfig, loadLocale }
    };

    return this;
  }

  public setTrumbowygPlugins(loadPlugins: IConfig['trumbowyg']['loadPlugins']) {
    const currentConfig = this.config.trumbowyg || {};
    this.config = {
      ...this.config,
      trumbowyg: { ...currentConfig, loadPlugins }
    };

    return this;
  }

  public setTrumbowygConfig(config: IConfig['trumbowyg']['config'], resetConfig: boolean = false) {
    const currentConfig = this.config.trumbowyg || {};
    this.config = {
      ...this.config,
      trumbowyg: {
        ...currentConfig,
        config: {
          ...(resetConfig ? {} : currentConfig.config || {}),
          ...config
        }
      }
    };

    return this;
  }

  public setValidationOn(event: IConfig['validationOn']) {
    this.config = {
      ...this.config,
      validationOn: event
    };

    return this;
  }
}
