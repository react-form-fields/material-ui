import ConfigProviderCore from '@react-form-fields/core/ConfigProvider';

import ConfigBuilderClass from './builder';

export { IConfig } from './context';
export const ConfigBuilder = ConfigBuilderClass;

const ConfigProvider = ConfigProviderCore;
ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;