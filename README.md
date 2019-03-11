![logo](https://avatars2.githubusercontent.com/u/40718737?s=50&v=4)  
React Form Fields: Material UI
------------------------------

See [Core](https://github.com/react-form-fields/core)
See [Demo](https://react-form-fields.github.io/material-ui)
See [API.md](https://github.com/react-form-fields/material-ui/blob/master/API.md) for details

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
  import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
  import FieldText from '@react-form-fields/material-ui/components/Text';

  // render()
  <FormValidation onSubmit={this.onSubmit}>
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
  </FormValidation>

  // onSubmit()
  onSubmit = (isValid: boolean) => {
    if(isValid) { 
      console.log('all fields are valid');
    }
    // or by React.createRef
    const isValid = this.formValidation.current.isValid();
  }
  
```

### Config

Global Setup example:

```js
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import lang from '@react-form-fields/material-ui/lang/pt-br';

const fieldConfig = new ConfigBuilder()
  .fromLang(lang)
  // Add new mask:
  //.addMask('money', value => `R$ ${value}`, value => value.replace(/\D/gi, ''))
  .build();

class App extends React.PureComponent {
  render() {
    return (
      <FormFieldsContext config={fieldConfig}>
      {/* ... */}
      </FormFieldsContext>
    );
  }
}
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
  // usage
  <FieldText
    label='Phone'
    type='text'
    mask='phone'
    value={phone}
    onChange={v => this.setState({ phone: v }))}
  />
```

### List of Masks

See: [Core Masks](https://github.com/react-form-fields/core#common-masks)