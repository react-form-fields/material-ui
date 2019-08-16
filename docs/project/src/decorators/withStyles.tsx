import withStyles from '@material-ui/core/styles/withStyles';

type Styles = (theme: any) => Object;

export function WithStyles(
  styles: Styles | Object,
  options?: any
) {
  return function <T>(target: T): T {
    return withStyles(styles as any, options)(target as any) as any;
  };
}

export type AppStyle<Classkeys extends string = string> = any;

export interface IStyledProps<T = any> {
  classes?: any;
}