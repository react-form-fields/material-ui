import { IMaskFunction } from '..';

const cpf: IMaskFunction = {
  apply: (value: string) => {
    if (!value) return '';

    const regexp = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2}).*/;
    const result = '$1.$2.$3-$4';

    return value
      .replace(regexp, result)
      .replace(/[-.\\]$/, '')
      .replace(/[-.\\]$/, '')
      .replace(/[-.\\]$/, '');
  },
  clean: (value: string) => value.replace(/\D/gi, '').substr(0, 11)
};

const cnpj: IMaskFunction = {
  apply: (value: string) => {
    if (!value) return '';

    const regexp = /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/;
    const result = '$1.$2.$3/$4-$5';

    return value
      .replace(regexp, result)
      .replace(/[-.\\]$/, '')
      .replace(/[-.\\]$/, '')
      .replace(/[-.\\]$/, '');
  },
  clean: (value: string) => value.replace(/\D/gi, '').substr(0, 14)
}

export default [{
  name: 'zipcode',
  apply: (value: string) => value.replace(/^(\d{0,5})(\d{0,3}).*/, '$1-$2').replace(/-$/, ''),
  clean: (value: string) => value.replace(/\D/gi, '').substr(0, 8)
}, {
  name: 'phone',
  apply: (value: string) => {
    if (!value) return '';

    const regexp = value.length > 10 ?
      /^(\d{0,2})(\d{0,5})(\d{0,4}).*/ :
      /^(\d{0,2})(\d{0,4})(\d{0,4}).*/;

    const result = value.length > 2 ?
      '($1) $2-$3' : '($1$2$3';

    return value.replace(regexp, result).replace(/-$/, '');
  },
  clean: (value: string) => value.replace(/\D/gi, '').substr(0, 11)
}, {
  name: 'document',
  apply: (value: string) => {
    if (!value) return '';
    return value.length > 11 ? cnpj.apply(value) : cpf.apply(value);
  },
  clean: (value: string) => {
    if (!value) return '';
    return value.length > 11 ? cnpj.clean(value) : cpf.clean(value);
  }
}, {
  name: 'cpf',
  ...cpf
}, {
  name: 'cnpj',
  ...cnpj
}];