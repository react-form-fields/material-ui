import { IConfig } from '@react-form-fields/core/config';
import CoreConfigBuilder from '@react-form-fields/core/config/builder';

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

  public setEditorConfig(locale: string, toolbar?: object) {
    this.config = {
      ...this.config,
      editorLocale: locale,
      editorToolbar: toolbar || this.config.editorToolbar
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