import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import snakeCase from 'lodash/snakeCase';
import HashIcon from 'mdi-react/HashtagIcon';
import React, { PureComponent } from 'react';

interface IProps {
  title: string;
}

export default class SectionTitle extends PureComponent<IProps> {
  render() {
    const { title } = this.props;

    return (
      <Typography variant='h4'>
        <IconButton href={`#${snakeCase(title)}`}>
          <HashIcon />
        </IconButton>
        {title}
      </Typography>
    );
  }
}