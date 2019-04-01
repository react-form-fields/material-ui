import withStyles, { StyleRules, StyleRulesCallback, WithStylesOptions } from '@material-ui/core/styles/withStyles';

export function WithStyles(
  styles: StyleRules<any> | StyleRulesCallback<any>,
  options?: WithStylesOptions
) {
  return function <T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}

export type AppStyle<Classkeys extends string = string> = StyleRules<Classkeys> | StyleRulesCallback<Classkeys>;

export type ClassesFrom<AppStyle> = {
  [key in AppStyle extends StyleRulesCallback ? keyof ReturnType<AppStyle> : keyof AppStyle]: string
};

export interface IStyledProps<T = any> {
  classes?: ClassesFrom<T>;
}