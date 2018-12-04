import * as monacoEditor from 'monaco-editor';
import React, { PureComponent } from 'react';
import MonacoEditor from 'react-monaco-editor';

import { WithStyles } from '../decorators/withStyles';

// I don't think the following makes any difference
monacoEditor.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monacoEditor.languages.typescript.JsxEmit.React
});

interface IProps {
  content: string;
  classes?: any;
}

@WithStyles({
  container: {
    margin: '20px 0'
  }
})
export default class Code extends PureComponent<IProps> {
  options: monacoEditor.editor.IEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true
  };

  get height() {
    return 19 * this.props.content.split('\n').length;
  }

  render() {
    const { content, classes } = this.props;

    return (
      <div className={classes.container}>
        <MonacoEditor
          height={this.height}
          language='typescript'
          theme='vs-dark'
          value={content}
          options={this.options}
        />
      </div>
    );
  }
}