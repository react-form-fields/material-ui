Material UI Form Fields
-----------------------

## Install

```bash
yarn add material-ui-form-fields
```

## Usage

### Individual

```jsx
  // import
  import FieldText from 'material-ui-form-fields/components/Text';

  // render()
  <FieldText
    ref={ref => this.field = ref}
    label='Email'
    type='email'
    disabled={disabled}
    value={email}
    validation='required|email'
    onChange={v => this.setState({ email: v }))}
  />

  // onSubmit()
  if(this.field.isValid()) { 
    console.log('submit');
  }
```

### Complete Form

```jsx
  // import
  import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
  import FieldText from 'material-ui-form-fields/components/Text';

  // render()
  <ValidationContext ref={ref=> this.validation = ref}>
    <FieldText
      ref={ref => this.field = ref}
      label='Email'
      type='email'
      value={email}
      validation='required|email'
      onChange={v => this.setState({ email: v }))}
    />

    <FieldText
      label='Senha'
      type='password'
      value={password}
      validation='required'
      onChange={v => this.setState({ password: v }))}
    />
  </ValidationContext>

  // onSubmit()
  if(this.validation.isValid()) { 
    console.log('all fields are valid');
  }
```

## Validation Rules and Config

See [validatorjs](https://github.com/skaterdav85/validatorjs)

## Mask

Only FieldText has mask prop;

```js
  // register
  import { register } from 'material-ui-form-fields/mask';
   
  // -optional
  import commonMasks from 'material-ui-form-fields/mask/common/pt-br';

  register([
    ...commonMasks, // -optional
    name: 'my-new-mask',
    apply: value => {
      if (!value) return value;

      const regexp = value.length > 10 ?
        /^(\d{0,2})(\d{0,5})(\d{0,4}).*/ :
        /^(\d{0,2})(\d{0,4})(\d{0,4}).*/;

      const result = value.length > 2 ?
        '($1) $2-$3' : '($1$2$3';

      return value.replace(regexp, result).replace(/-$/, '');
    },
    clean: value => value.replace(/\D/gi, '').substr(0, 11)
  ])

  // usage
  <FieldText
    label='Phone'
    type='text'
    mask='my-new-mask'
    value={phone}
    onChange={v => this.setState({ phone: v }))}
  />
```

### Common Masks

#### PT-BR:

* zipcode
* phone
* document (CNPJ/CPF)
* cpf
* cnpj