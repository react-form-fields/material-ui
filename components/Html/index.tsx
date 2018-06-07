import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { InputLabel, Typography } from '@material-ui/core';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { WithStyles } from '../../decorators/withStyles';
import FieldBase, { IPropsFieldBase, IStateFieldBase } from '../Base';

const styles = require('./style.css');

interface IState extends IStateFieldBase {
  editorState: EditorState;
  lastValue: string;
  focused: boolean;
}

interface IProps extends IPropsFieldBase {
  value: string;
  onChange: (value: string) => void;
}

@WithStyles(theme => ({
  label: {
    display: 'block',
    marginBottom: 5
  },
  fullWrapper: {
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.27)' : 'rgba(255, 255, 255, 0.7)',
  },
  editorWrapper: {
    ...theme.typography.body1
  }
}))
export default class FieldHtml extends FieldBase<IProps, IState> {
  static getDerivedStateFromProps(nextProps: IProps, currentState: IState): IState {
    let { editorState, lastValue } = currentState;

    if (lastValue !== nextProps.value) {
      lastValue = nextProps.value;

      const blocksFromHtml = htmlToDraft(lastValue || '');
      const { contentBlocks, entityMap } = blocksFromHtml;

      editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
    }

    return {
      ...currentState,
      ...FieldBase.getDerivedStateFromProps(nextProps, currentState),
      editorState,
      lastValue
    };
  }

  onChange(editorState: EditorState) {
    let lastValue = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
    if (lastValue === '<p></p>') lastValue = null;

    this.setState({ editorState, lastValue });
    super.onChange(lastValue);
  }

  onBlurFocus(focused: boolean) {
    this.setState({ focused });
  }

  render() {
    const { editorState, focused } = this.state;
    const { classes, label, helperText, disabled } = this.props;

    return (
      <div className={`${styles.component}`}>
        {super.render()}

        <div className={classes.label}>
          <InputLabel error={!!this.errorMessage} required={this.isRequired} focused={focused}>{label}</InputLabel>
          {helperText || this.errorMessage ?
            <Typography variant='caption' color={this.errorMessage ? 'error' : 'default'}>
              {this.errorMessage || helperText}
            </Typography>
            : null}
        </div>

        <Editor
          readOnly={disabled}
          placeholder='Nenhum conteúdo'
          editorState={editorState}
          onFocus={this.onBlurFocus.bind(this, true)}
          onBlur={this.onBlurFocus.bind(this, false)}
          onEditorStateChange={this.onChange.bind(this)}
          wrapperClassName={`${styles.fullWrapper} ${classes.fullWrapper} ${focused ? ' focused ' : ''} ${disabled ? ' disabled ' : ''}`}
          toolbarClassName={`${styles.toolbarWrapper} ${classes.toolbarWrapper}`}
          editorClassName={`${styles.editorWrapper} ${classes.editorWrapper} ${disabled ? ' disabled ' : ''}`}
          toolbar={{
            inline: { options: ['bold', 'italic'] },
            list: { options: ['unordered', 'ordered'] },
            embedded: { className: styles.hide },
            fontSize: { className: styles.hide },
            blockType: { className: styles.hide },
            remove: { className: styles.hide },
            colorPicker: { className: styles.hide },
            fontFamily: { className: styles.hide },
            textAlign: { className: styles.hide },
            emoji: { className: styles.hide }
          }}
          localization={{
            locale: 'pt'
          }}
        />
      </div>
    );
  }
}