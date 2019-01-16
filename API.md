API
---

* [Base](#base)
* [Text](#text)
* [Checkbox / Switch](#checkbox-/-switch)
* [Radio](#radio)
* [Date](#date)
* Time (comming soon)
* [Select](#select)
* [Switch](#switch)
* [Color](#color)
* [Autocomplete](#autocomplete)
* [HTML](#html)
* [Hidden](#hidden)
* [Custom Message](#custom-message)
* [FormValidation](#form-validation)

### Base (Common props)

| Props             | Required | Type                   | Description                                        |
|-------------------|----------|------------------------|----------------------------------------------------|
| label             | false    | string                 |                                                    |
| helperText        | false    | string                 |                                                    |
| disabled          | false    | boolean                |                                                    |
| validation        | false    | string                 | rules of validation                                |
| validationContext | false    | object { prop: value } | extra fields for validation bind (ex. required_if) |
| errorMessage      | false    | string                 | custom error message from external validation      |

#### Text

All [material-ui](https://material-ui.com/api/text-field/) props and:

| Props    | Required | Type                    | Description                          |
|----------|----------|-------------------------|--------------------------------------|
| value    | true     | any                     |                                      |
| mask     | false    | string                  |                                      |
| onChange | true     | Function(string/number) |                                      |
| loading  | false    | boolean                 | if true will add a progress at right |

#### Checkbox / Switch

All material-ui 
[checkbox](https://material-ui.com/api/checkbox/) and
[switch](https://material-ui.com/api/switch/) 
 props and:

| Props      | Required | Type                                     | Description                   |
|------------|----------|------------------------------------------|-------------------------------|
| value      | false    | any                                      | if null will return a boolean |
| checked    | true     | boolean                                  |                               |
| helperText | false    | string                                   |                               |
| onChange   | true     | Function(value (if provided) or boolean) |                               |

### Radio 

All material-ui [radio](https://material-ui.com/api/radio/) props and:

| Props      | Required | Type            | Description                        |
|------------|----------|-----------------|------------------------------------|
| value      | true     | any             | Value that will return if selected |
| checked    | true     | boolean         |                                    |
| helperText | false    | string          |                                    |
| onChange   | true     | Function(value) |                                    |


### Date

All [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers) props and:

| Props         | Required | Type           | Description                                       |
|---------------|----------|----------------|---------------------------------------------------|
| value         | true     | Date           |                                                   |
| minDate       | false    | Date           |                                                   |
| maxDate       | false    | Date           |                                                   |
| disablePast   | false    | boolean        |                                                   |
| disableFuture | false    | boolean        |                                                   |
| format        | false    | string         | date fns string format                            |
| locale        | false    | string         | use dateLocale as default                         |
| onChange      | true     | Function(date) |                                                   |
| keepTime      | false    | boolean        | by default the time part is removed from the date |

#### Select

All [material-ui](https://material-ui.com/api/select/) props and:

| Props    | Required | Type                                           | Description                          |
|----------|----------|------------------------------------------------|--------------------------------------|
| value    | true     | any                                            |                                      |
| options  | true     | object { value: string/number, label: string } |                                      |
| onChange | true     | Function(string/number)                        |                                      |
| loading  | false    | boolean                                        | if true will add a progress at right |

#### Color

| Props    | Required | Type             | Description |
|----------|----------|------------------|-------------|
| value    | true     | string           |             |
| onChange | true     | Function(string) |             |


#### Autocomplete

| Props    | Required | Type                                           | Description |
|----------|----------|------------------------------------------------|-------------|
| value    | true     | any                                            |             |
| options  | true     | object { value: string/number, label: string } |             |
| onChange | true     | Function(string/number)                        |             |

#### HTML

All [react-draft-wysiwyg](https://jpuri.github.io/react-draft-wysiwyg/#/docs) props and:

| Props    | Required | Type             | Description |
|----------|----------|------------------|-------------|
| value    | true     | string           | HTML        |
| onChange | true     | Function(string) | output HTML |

You can pass toolbar as a prop or set through config

#### Hidden

| Props | Required | Type | Description |
|-------|----------|------|-------------|
| value | true     | any  |             |

#### Custom Message

| Props    | Required | Type   | Description        |
|----------|----------|--------|--------------------|
| rules    | true     | string | separated by comma |
| children | true     | string | message            |


#### Form Validation

| Props    | Required | Type     | Description               |
|----------|----------|----------|---------------------------|
| onSubmit | true     | function | params = isValid: boolean |

| Methods by Ref | Params                                | Return  | Description                  |
|----------------|---------------------------------------|---------|------------------------------|
| isValid        | formSubmitted: boolean = default true | boolean | Check is all field are valid |
| reset          |                                       | void    | Reset the validation state   |
