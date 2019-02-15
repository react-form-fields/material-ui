import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import { getConfig } from '@react-form-fields/core/config';
import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import * as draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as React from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';

import { WithStyles } from '../../decorators/withStyles';
import { IBaseFieldProps } from '../../interfaces/props';
import * as styles from './style.css';

type PropsResolver = {
  [K in Exclude<keyof EditorProps, keyof IBaseFieldProps>]?: EditorProps[K]
};

interface IState extends IStateFieldBase {
  editorState: EditorState;
  lastValue: string;
  focused: boolean;
}

interface IProps extends IBaseFieldProps, PropsResolver {
  helperText?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
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
  changeTimeout: number;
  localization = { locale: getConfig().editorLocale || 'en' };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let { lastValue } = this.state;
    clearTimeout(this.changeTimeout);

    if (lastValue !== this.props.value) {
      this.changeTimeout = setTimeout(() => {
        lastValue = this.props.value;

        const blocksFromHtml = htmlToDraft(lastValue || '');
        const { contentBlocks, entityMap } = blocksFromHtml;

        const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
        this.setState({ editorState, lastValue });
      }, 100);
    }
  }

  onChange = (editorState: EditorState) => {
    let lastValue = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();
    if (lastValue === '<p></p>') lastValue = null;

    this.setState({ editorState, lastValue });

    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(lastValue);
  }

  onBlur = (e: React.SyntheticEvent) => {
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
    this.setState({ focused: false });
    this.props.onBlur && this.props.onBlur(e);
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  handlePastedText = (text: string, html: string): boolean => {
    const { editorState } = this.state;

    const blockMap = stateFromHTML(html || text).blockMap;
    const newState = Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);

    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));

    return true;
  }

  get toolbar() {
    return this.props.toolbar || getConfig().editorToolbar;
  }

  render() {
    const { editorState, focused } = this.state;
    const { classes, label, helperText, placeholder, disabled, onChange, onBlur, ...editorProps } = this.props;

    return (
      <div className={`${styles.component}`}>

        <ValidationContextRegister field={this} />

        <div className={classes.label}>
          <InputLabel error={!!this.errorMessage} required={this.isRequired} focused={focused}>{label}</InputLabel>
          {helperText || this.errorMessage ?
            <Typography variant='caption' color={this.errorMessage ? 'error' : 'default'}>
              {this.errorMessage || helperText}
            </Typography>
            : null
          }
        </div>
        <Editor
          {...editorProps}
          readonly={disabled}
          placeholder={placeholder}
          editorState={editorState}
          handlePastedText={this.handlePastedText}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onEditorStateChange={this.onChange}
          wrapperClassName={`${styles.fullWrapper} ${classes.fullWrapper} ${focused ? ' focused ' : ''} ${disabled ? ' disabled ' : ''}`}
          toolbarClassName={`${styles.toolbarWrapper} ${classes.toolbarWrapper}`}
          editorClassName={`${styles.editorWrapper} ${classes.editorWrapper} ${disabled ? ' disabled ' : ''}`}
          toolbar={this.toolbar}
          localization={this.localization}
        />
      </div>
    );
  }
}