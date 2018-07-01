import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Typography from '@material-ui/core/Typography/Typography';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { WithStyles } from '../../decorators/withStyles';
import { ITextFieldProps } from '../../interfaces/props';

const styles = require('./style.css');

interface IState extends IStateFieldBase {
  editorState: EditorState;
  lastValue: string;
  focused: boolean;
}

interface IProps extends ITextFieldProps {
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
export default class FieldHtml extends FieldCoreBase<IProps, IState> {
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
      ...FieldCoreBase.getDerivedStateFromProps(nextProps, currentState),
      editorState,
      lastValue
    };
  }

  onChange = (editorState: EditorState) => {
    let lastValue = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
    if (lastValue === '<p></p>') lastValue = null;

    this.setState({ editorState, lastValue, touched: true });
    this.props.onChange(lastValue);
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  handlePastedText = (text: string, html: string): boolean => {
    const { editorState } = this.state;

    const blockMap = stateFromHTML(html || text).blockMap;
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);

    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));

    return true
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
          handlePastedText={this.handlePastedText}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onEditorStateChange={this.onChange}
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