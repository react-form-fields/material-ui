import { RouteComponentProps, withRouter } from 'react-router';

export function WithRouter() {
  return function <T>(target: T): T {
    return withRouter(target as any) as any;
  };
}

export interface IRouteProps<P = any> extends Partial<RouteComponentProps<P>> {

}