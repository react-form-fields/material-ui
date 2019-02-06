import IconButton from '@material-ui/core/IconButton/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import FieldCoreBase, { IStateFieldBase } from '@react-form-fields/core/components/FieldCoreBase';
import ValidationContextRegister from '@react-form-fields/core/components/ValidationContextRegister';
import * as match from 'autosuggest-highlight/match';
import * as parse from 'autosuggest-highlight/parse';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import {
  ChangeEvent,
  RenderSuggestionParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';

import { getConfig } from '../../config';
import { WithStyles } from '../../decorators/withStyles';
import { IBaseFieldProps, TextFieldPropsResolver } from '../../interfaces/props';
import Input from './Input';
import SuggestionsContainer from './SuggestionsContainer';

interface IState extends IStateFieldBase {
  term: string;
  value: string;
  suggestions: IProps['options'][0][];
}

interface IProps extends IBaseFieldProps, TextFieldPropsResolver {
  value: any;
  onChange: (value: any) => void;
  options: { value: any, label: string }[];
  optionsSize?: number;
}

@WithStyles(theme => ({
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 50,
    maxHeight: 300,
    overflow: 'auto'
  },
  suggestionsContainerOpenWithLabel: {
    top: 65
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  adornment: {
    marginRight: -15
  }
}))
export default class FieldAutocomplete extends FieldCoreBase<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, term: '', suggestions: [] };
  }

  static getDerivedStateFromProps(nextProps: IProps, currentState: IState): IState {
    let term = currentState.term;

    if (nextProps.value !== currentState.value || term === undefined) {
      term = (nextProps.options.find(o => o.value === nextProps.value) || { label: undefined }).label;
    }

    return {
      ...currentState,
      ...FieldCoreBase.getDerivedStateFromProps(nextProps, currentState),
      value: nextProps.value,
      term
    };
  }

  onChange = (value: any) => {
    getConfig().validationOn === 'onChange' && this.setState({ showError: true });
    this.props.onChange(value);
  }

  getSuggestionValue = (suggestion: IProps['options'][0]) => {
    return suggestion.label;
  }

  handleChange = (event: React.FormEvent<any>, params?: ChangeEvent) => {
    this.setState({ term: params.newValue });
  }

  handleBlur = () => {
    const { value, options } = this.props;
    getConfig().validationOn === 'onBlur' && this.setState({ showError: true });

    if (!this.state.term) {
      return this.handleClearValue();
    }

    const term: string = (options.find(o => o.value === value) || { label: null }).label;
    this.setState({ term });
  }

  handleSelected = (event: React.FormEvent<any>, data: SuggestionSelectedEventData<IProps['options'][0]>) => {
    this.onChange(data.suggestion.value);
  }

  handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    let suggestions = this.props.options
      .filter(o => o.label.toString().toLowerCase().includes(value.toLowerCase()));

    if (this.props.optionsSize !== 0) {
      suggestions = suggestions.slice(0, this.props.optionsSize || 10);
    }

    this.setState({ suggestions });
  }

  handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  }

  handleClearValue = () => {
    this.setState({ term: null });
    this.onChange(null);
  }

  shouldRenderSuggestions = () => true;

  render() {
    const { term, suggestions } = this.state;
    const { classes, placeholder, disabled, label, optionsSize, options, onChange, onBlur, ...extraProps } = this.props;

    return (
      <React.Fragment>
        <ValidationContextRegister field={this} />

        <Autosuggest
          suggestions={suggestions}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: `${classes.suggestionsContainerOpen} ${label ? classes.suggestionsContainerOpenWithLabel : ''}`,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={Input}
          renderSuggestionsContainer={SuggestionsContainer}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.handleSelected}
          inputProps={{
            ...extraProps as any,
            errorMessage: this.errorMessage,
            classes,
            placeholder: placeholder || 'Pesquisar...',
            required: this.isRequired,
            value: term || '',
            onBlur: this.handleBlur,
            onChange: this.handleChange,
            endAdornment: (!term ?
              <InputAdornment position='end'>
                <IconButton disabled={true} className={classes.adornment}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
              :
              <InputAdornment position='end' onClick={this.handleClearValue}>
                <IconButton disabled={disabled} className={classes.adornment}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </React.Fragment>
    );
  }

  renderSuggestion(suggestion: IProps['options'][0], { query, isHighlighted }: RenderSuggestionParams) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part: any, index: number) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
                <strong key={index} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }
}