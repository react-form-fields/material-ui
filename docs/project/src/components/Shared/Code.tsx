import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IStyledProps } from '@react-form-fields/material-ui/decorators/withStyles';
import CopyIcon from 'mdi-react/ContentCopyIcon';
import * as monacoEditor from 'monaco-editor';
import React, { ComponentType, PureComponent } from 'react';
import { MonacoEditorProps } from 'react-monaco-editor';

import { WithStyles } from '../../decorators/withStyles';
import Toast from './Toast';

interface IProps {
  content: string;
  lang?: string;
  classes?: any;
}

@WithStyles(theme => ({
  container: {
    margin: '20px 0',
    backgroundColor: '#1e1e1e',
    color: '#c4c4c4',
    position: 'relative',
    paddingTop: 10,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden'
  },
  buttons: {
    textAlign: 'right',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  }
}))
export default class Code extends PureComponent<IProps> {
  editorRef = React.createRef<any>();
  MonacoEditor: ComponentType<MonacoEditorProps & { ref?: any }>;
  options: monacoEditor.editor.IEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'off',
    automaticLayout: true,
    lineNumbers: 'off',
    contextmenu: false,
    folding: false
  };

  constructor(props: IProps) {
    super(props);
    console.log('codde');
    this.MonacoEditor = React.lazy(async () => {
      const monacoEditor = await import('monaco-editor');
      monacoEditor.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monacoEditor.languages.typescript.JsxEmit.React
      });

      const MonacoEditor = await import('react-monaco-editor');
      return MonacoEditor;
    });
  }

  get lineNumbers() {
    return this.props.content.split('\n').length;
  }

  get height() {
    return (18 * this.props.content.split('\n').length) + 10;
  }

  handleCopy = () => {
    this.editorRef.current.editor.focus();
    this.editorRef.current.editor.setSelection({ startColumn: 1, startLineNumber: 1, endLineNumber: this.lineNumbers + 1, endColumn: 999 });
    this.editorRef.current.editor.trigger('source', 'editor.action.clipboardCopyAction');
    this.editorRef.current.editor.setSelection({ startColumn: 1, startLineNumber: 1, endLineNumber: 1, endColumn: 1 });

    Toast.show('Copiado');
  }

  render() {
    const { content, classes, lang } = this.props;
    const { MonacoEditor } = this;

    return (
      <div className={classes.container}>
        <React.Suspense fallback={<Loading />}>
          <div className={classes.buttons}>
            <IconButton color='inherit' onClick={this.handleCopy}>
              <CopyIcon size={16} />
            </IconButton>
          </div>

          <MonacoEditor
            height={this.height}
            ref={this.editorRef}
            language={lang || 'typescript'}
            theme='vs-dark'
            value={content}
            options={this.options}
          />
        </React.Suspense>
      </div>
    );
  }
}

@WithStyles({
  text: { paddingBottom: 10, textAlign: 'center' }
})
class Loading extends PureComponent<IStyledProps> {
  render() {
    const { classes: { text } } = this.props;
    return <Typography color='inherit' className={text}>Carregando...</Typography>;
  }
}