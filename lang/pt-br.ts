import { IConfig } from '@react-form-fields/core/config';
import coreLangPTBR from '@react-form-fields/core/lang/pt-br';
import locale from 'date-fns/locale/pt-BR';

const langPTBR: IConfig = {
  ...coreLangPTBR,
  dateLocale: locale,
  dateFormat: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'dd/MM/yyyy HH:mm',
  dateLabels: {
    cancel: 'Cancelar',
    ok: 'Ok',
    clear: 'Limpar'
  },
  trumbowyg: {
    loadLocale: () => import('trumbowyg/dist/langs/pt_br.min.js'),
    config: { lang: 'pt_br' }
  }
};

export default langPTBR;