import './App.css';

import { AppBar, CssBaseline, Grid, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { CodeTagsIcon, GithubCircleIcon } from 'mdi-react';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

import Form from './Form';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true
});


export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <JssProvider generateClassName={generateClassName}>
                <div className='root'>
                    <CssBaseline />
                    <AppBar elevation={1}>
                        <Toolbar>
                            <Grid container spacing={24} style={{ alignItems: 'center' }}>
                                <Grid item xs={true}>
                                    <Typography variant='title' color='inherit'>Material UI Form Fields</Typography>
                                </Grid>
                                <Grid item xs={false}>
                                    <Tooltip title='Sample code'>
                                        <IconButton color='inherit' target='_blank' href='https://github.com/react-form-fields/material-ui/blob/master/docs/project/src/Form.tsx'>
                                            <CodeTagsIcon size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={false}>
                                    <Tooltip title='Github'>
                                        <IconButton color='inherit' target='_blank' href='https://github.com/react-form-fields/material-ui'>
                                            <GithubCircleIcon size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                    <Form />
                </div>
            </JssProvider>
        );
    }
}