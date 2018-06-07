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
    accepted: 'O :attribute precisa ser aceito.',
    alpha: 'O campo :attribute só pode conter letras.',
    alpha_dash: 'O campo :attribute só pode conter letras, números, hífens e sublinha.',
    alpha_num: 'O campo :attribute só pode conter letras e números.',
    between: 'O campo :attribute precisa estar entre :min e :max.',
    def: 'O atributo :attribute contém erros.',
    digits: 'O atributo :attribute precisa ter :digits dígitos.',
    different: 'O :attribute e :different precisam ser diferentes.',
    not_in: 'O :attribute selecionado é inválido.',
    numeric: 'O :attribute precisa ser um número.',
    present: 'O campo :attribute deve estar presente (mas pode estar vazio).',
    size: {
      numeric: 'O :attribute precisa ser :size.',
      string: 'O :attribute precisa ter :size caracteres.'
    },
    string: 'O :attribute precisa ser uma palavra.',
    url: 'O formato de :attribute é inválido.',
    regex: 'O formato de :attribute é inválido.',
    attributes: {}
  }
};

export default language;