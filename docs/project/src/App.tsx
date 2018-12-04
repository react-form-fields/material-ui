import './App.css';

import formCode from '!raw-loader!./components/Form';
import { AppBar, Collapse, CssBaseline, Grid, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { createGenerateClassName } from '@material-ui/core/styles';
import { CodeTagsIcon, GithubCircleIcon } from 'mdi-react';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

import Code from './components/Code';
import Form from './components/Form';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true
});

interface IState {
    showCode: boolean;
}


export default class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = { showCode: false };
    }

    toogleCode = () => {
        this.setState({ showCode: !this.state.showCode });
    }

    render() {
        const { showCode } = this.state;

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
                                        <IconButton color='inherit' onClick={this.toogleCode}>
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

                    <Collapse in={showCode}>
                        <Code content={formCode} />
                    </Collapse>
                    <Form />
                </div>
            </JssProvider>
        );
    }
}