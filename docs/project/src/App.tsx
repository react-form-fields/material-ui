import './App.css';

import formCode from '!raw-loader!./components/Form';
import { AppBar, Collapse, CssBaseline, Grid, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import FormFieldsContext from '@react-form-fields/material-ui/components/Context';
import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import GithubCircleIcon from 'mdi-react/GithubCircleIcon';
import * as React from 'react';

import Code from './components/Code';
import Form from './components/Form';

interface IState {
    showCode: boolean;
}

const fieldConfig = new ConfigBuilder()
    .build();

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
            <FormFieldsContext config={fieldConfig}>

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
            </FormFieldsContext>
        );
    }
}