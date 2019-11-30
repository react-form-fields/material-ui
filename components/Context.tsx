import DateUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IConfig, setConfig } from '@react-form-fields/core/config';
import * as React from 'react';

import { getConfig } from '../config';

interface IProps {
  config?: IConfig;
}

export default class FormFieldsContext extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    setConfig(this.props.config);
  }

  componentDidUpdate(prevProps: IProps) {
    if (!this.props.config || prevProps.config === this.props.config) return;
    setConfig(this.props.config);
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateUtils} locale={getConfig().dateLocale}>
        {this.props.children}
      </MuiPickersUtilsProvider>
    );
  }
}