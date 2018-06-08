import 'moment/locale/pt-br';
import 'validatorjs/dist/lang/pt';

import { IConfig } from '../../config';

const language: IConfig['validation'] = {
  lang: 'custom-pt-br',
  customMessages: {
    same: 'Não coincide.',
    confirmed: 'Não coincide.',
    after: 'Deve ser depois que :after.',
    after_or_equal: 'Deve ser igual ou depois que :after_or_equal.',
    email: 'Inválido',
    date: 'Inválido',
    in: 'Inválido',
    integer: 'Inválido',
    min: {
      numeric: 'Valor mínimo :min',
      string: 'Mínimo :min caracteres'
    },
    max: {
      numeric: 'Valor máximo :max',
      string: 'Máximo :max caracteres'
    },
    required: 'Obrigatório',
    required_if: 'Obrigatório se :other',
    accepted: 'Precisa ser aceito.',
    alpha: 'Só pode conter letras.',
    alpha_dash: 'Só pode conter letras, números, hífens e sublinha.',
    alpha_num: 'Só pode conter letras e números.',
    between: 'Precisa estar entre :min e :max.',
    def: 'Contém erros.',
    digits: 'Precisa ter :digits dígitos.',
    different: 'O :attribute e :different precisam ser diferentes.',
    not_in: 'Inválido.',
    numeric: 'Precisa ser um número.',
    present: 'O campo :attribute deve estar presente (mas pode estar vazio).',
    size: {
      numeric: 'Precisa ser :size.',
      string: 'Precisa ter :size caracteres.'
    },
    string: 'Precisa ser uma palavra.',
    url: 'Inválido.',
    regex: 'Inválido.',
    attributes: {}
  }
};

export default language;