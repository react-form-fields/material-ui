import Paper from '@material-ui/core/Paper/Paper';
import * as React from 'react';

export default function SuggestionsContainer(props: any) {
  const { containerProps, children } = props;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}