Material UI Form Fields
-----------------------

See [Demo](https://danieloprado.github.io/material-ui-form-fields)

See [API.md](https://github.com/danieloprado/material-ui-form-fields/blob/master/API.md) for details

## Requirements 

* React >= 16.0.0
* Material-ui >= 1.0.0

## Install

```bash
yarn add @react-form-fields/material-ui
```

## Usage

### Individual field

```jsx
  // import
  import FieldText from '@react-form-fields/material-ui/components/Text';

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
  import ValidationContext from '@react-form-fields/material-ui/components/ValidationContext';
  import FieldText from '@react-form-fields/material-ui/components/Text';

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

### Config

Global Setup example:

```js
import { setConfig } from '@react-form-fields/material-ui/config';
import commonMasks from '@react-form-fields/material-ui/mask/common/pt-br';
import validationMessage from '@react-form-fields/material-ui/validator/custom-languages/pt-br';

setConfig({
  masks: commonMasks,
  defaultDateLocale: 'pt-br',
  validation: validationMessage
});
```

## Validation Rules and Config

See [validatorjs](https://github.com/skaterdav85/validatorjs)

Validation Context

```jsx
<FieldDate
  label='Begin Date'
  name='begin'
  value={model.beginDate}
  validation='date'
  onChange={(v => this.setState({ model: { ...model, beginDate: v } }))}
/>

<FieldDate
  label='End Date'
  name='end'
  value={model.endDate}
  validation='date|after_or_equal:begin date' //after_or_equal needs a value from other prop (ex: 'begin date')
  validationContext={{ 'begin date': model.beginDate }} // build the dependency object as you needed
  onChange={(v => this.setState({ model: { ...model, endDate: v } }))}
/>
```

Custom Message

```jsx
<FieldDate
  label='Begin Date'
  name='begin'
  value={model.beginDate}
  validation='date'
  onChange={(v => this.setState({ model: { ...model, beginDate: v } }))}
>
  <CustomMessage rules='date'>This not a date!</CustomMessage>
</FieldDate>
```

## Mask

Only FieldText has mask prop;

```js
  // register
  import { register } from '@react-form-fields/material-ui/mask';
   
  // -optional
  import commonMasks from '@react-form-fields/material-ui/mask/common/pt-br';

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