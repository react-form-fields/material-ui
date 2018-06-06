import validator, { ErrorMessages } from 'validatorjs';

export function validate(fieldName: string, value: any, rule: string, context: any = {}): { valid: boolean, message?: string } {
  if (!rule) return { valid: true };

  fieldName = fieldName || 'value';
  const result = new validator({ [fieldName]: value, ...context }, { [fieldName]: rule });

  if (result.passes()) {
    return { valid: true };
  }

  const allErrors = result.errors.all();
  return { valid: false, message: allErrors[fieldName][0] };
}

export function useLang(lang: string) {
  validator.useLang(lang);
}

export function addLang(lang: string, messages: ErrorMessages) {
  validator.setMessages(lang, messages);
}