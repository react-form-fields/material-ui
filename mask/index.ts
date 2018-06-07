export interface IMask extends IMaskFunction {
  name: string;
}

interface IMaskContainer {
  [key: string]: IMaskFunction;
}

export interface IMaskFunction {
  apply(value: string): string;
  clean(value: string): string;
}

const container: IMaskContainer = {};

export function register(masks: IMask[]): void {
  masks.forEach(({ name, ...funcs }) => {
    container[name] = funcs;
  });
}

export function getMask(name: string): IMaskFunction {
  return container[name];
}