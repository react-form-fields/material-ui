import { Theme } from '@material-ui/core/styles';
import withStyles, { Styles, WithStylesOptions } from '@material-ui/core/styles/withStyles';

export function WithStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<Theme> = {},
  Props extends object = {}
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Options
) {
  return function <T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}

export type AppStyle<Classkeys extends string = string> = Styles<Theme, {}, Classkeys>;

export interface IStyledProps {
  classes?: any;
  theme?: Theme;
}