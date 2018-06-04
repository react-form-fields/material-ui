import validator from 'validatorjs';

export function validate(value: any, rule: string, context: any = {}): { valid: boolean, message?: string } {
  if (!rule) return { valid: true };

  const result = new validator({ value, ...context }, { value: rule });

  if (result.passes()) {
    return { valid: true };
  }

  const allErrors = result.errors.all();
  return { valid: false, message: allErrors.value[0] };
}