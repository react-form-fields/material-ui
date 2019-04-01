import IconButton from '@material-ui/core/IconButton';
import CopyIcon from 'mdi-react/ContentCopyIcon';
import * as monacoEditor from 'monaco-editor';
import React, { ComponentType, PureComponent } from 'react';
import { MonacoEditorProps } from 'react-monaco-editor';

import { WithStyles } from '../decorators/withStyles';

interface IProps {
  content: string;
  lang?: string;
  classes?: any;
}

@WithStyles({
  container: {
    margin: '20px 0'
  }
})
export default class Code extends PureComponent<IProps> {
  editorRef = React.createRef<any>();
  MonacoEditor: ComponentType<MonacoEditorProps & { ref?: any }>;
  options: monacoEditor.editor.IEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    lineNumbers: 'off'
  };

  async componentWillMount() {
    const monacoEditor = await import('monaco-editor');
    monacoEditor.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monacoEditor.languages.typescript.JsxEmit.React
    });

    const MonacoEditor = await import('react-monaco-editor');
    this.MonacoEditor = MonacoEditor.default;
    this.forceUpdate();
  }

  handleCopy = () => {
    this.editorRef.current.editor.focus();
    this.editorRef.current.editor.trigger('source', 'editor.action.clipboardCopyAction');
  }

  get height() {
    return 19 * this.props.content.split('\n').length;
  }

  render() {
    const { content, classes, lang } = this.props;
    const { MonacoEditor } = this;

    if (!MonacoEditor) {
      return null;
    }

    return (
      <div className={classes.container}>

        <IconButton onClick={this.handleCopy}>
          <CopyIcon />
        </IconButton>
        <MonacoEditor
          height={this.height}
          ref={this.editorRef}
          language={lang || 'typescript'}
          theme='vs-dark'
          value={content}
          options={this.options}
        />
      </div>
    );
  }
}