import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as React from 'react';

import { getConfig } from '../../config';
import { WithStyles } from '../../decorators/withStyles';
import { HTMLAttributesResolver, IBaseFieldProps } from '../../interfaces/props';
import * as styles from './style.css';

interface IState extends IStateFieldBase {
  focused: boolean;
}

interface IProps extends IBaseFieldProps, HTMLAttributesResolver {
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
  dependenciesLoaded: Promise<string>;
  instance: any;
  textareaRef = React.createRef<HTMLTextAreaElement>();

  constructor(props: IProps) {
    super(props);
    this.dependenciesLoaded = this.loadDependencies();
  }

  loadDependencies = async () => {
    if (!window.jQuery) {
      window.jQuery = window.$ = await import('jquery') as any;
    }

    const { loadLocale, loadPlugins } = getConfig().trumbowyg;
    const [svgPath] = await Promise.all([
      import('trumbowyg/dist/ui/icons.svg'),
      import('trumbowyg/dist/trumbowyg.min.js'),
      import('trumbowyg/dist/ui/trumbowyg.min.css'),
    ]);

    await Promise.all([
      import('trumbowyg/dist/plugins/history/trumbowyg.history.min.js'),
      import('trumbowyg/dist/plugins/cleanpaste/trumbowyg.cleanpaste.min.js'),
      loadLocale ? loadLocale() : Promise.resolve(),
      ...(loadPlugins ? loadPlugins() : []),
    ]);

    return svgPath;
  }

  async componentDidMount() {
    const svgPath = await this.dependenciesLoaded;
    this.instance = window.jQuery(this.textareaRef.current);

    this.instance.trumbowyg({
      svgPath,
      useComposition: false,
      autogrow: true,
      ...getConfig().trumbowyg.config
    }).on('tbwfocus', () => {
      this.onFocus();
    }).on('tbwchange', () => {
      this.onChange(this.instance.trumbowyg('html'));
    }).on('tbwblur', () => {
      this.onBlur(this.instance.trumbowyg('html'));
    });

    this.instance.trumbowyg('html', this.props.value);
  }

  componentDidUpdate() {
    this.instance.trumbowyg(this.props.disabled ? 'disable' : 'enable');

    if (this.instance.trumbowyg('html') !== this.props.value) {
      this.instance.trumbowyg('html', this.props.value);
    }
  }

  onChange = (value: string) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  onBlur = (value: string) => {
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });
    this.setState({ focused: false });
    this.props.onChange(value);
    this.props.onBlur && this.props.onBlur(null);
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  render() {
    const { focused } = this.state;
    const { classes, label, helperText, placeholder, disabled, ...otherProps } = this.props;

    return (
      <div className={styles.component}>

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

        <textarea
          ref={this.textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          {...otherProps}
        />

      </div>
    );
  }
}