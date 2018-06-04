import { IconButton, InputAdornment } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { Fragment } from 'react';
import Autosuggest, {
  ChangeEvent,
  RenderSuggestionParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';

import { WithStyles } from '../../decorators/withStyles';
import FieldBase, { IPropsFieldBase, IStateFieldBase } from '../Base';
import Input from './Input';
import SuggestionsContainer from './SuggestionsContainer';

interface IState extends IStateFieldBase {
  term: string;
  suggestions: IProps['options'][0][];
}

interface IProps extends IPropsFieldBase {
  options: { value: any, label: string }[];
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
    top: 50
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
export default class FieldAutocomplete extends FieldBase<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, term: '', suggestions: [] };
  }

  static getDerivedStateFromProps(nextProps: IProps, currentState: IState) {
    const term: string = (nextProps.options.find(o => o.value === nextProps.value) || { label: null }).label;
    return {
      ...currentState,
      term,
      ...FieldBase.getDerivedStateFromProps(nextProps, currentState)
    };
  }

  getSuggestionValue(suggestion: IProps['options'][0]) {
    return suggestion.label;
  }

  handleChange(event: React.FormEvent<any>, params?: ChangeEvent) {
    this.setState({ term: params.newValue });
  }

  handleBlur() {
    const { value, options } = this.props;
    const term: string = (options.find(o => o.value === value) || { label: null }).label;

    this.setState({ term });
  }

  handleSelected(event: React.FormEvent<any>, data: SuggestionSelectedEventData<IProps['options'][0]>) {
    super.onChange(data.suggestion.value);
  }

  handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    const suggestions = this.props.options
      .filter(o => o.label.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    this.setState({ suggestions });
  }

  handleSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  handleClearValue() {
    super.onChange(null);
  }

  render() {
    const { term, suggestions } = this.state;
    const { classes, placeholder, disabled, label } = this.props;

    return (
      <Fragment>
        {super.render()}

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
          shouldRenderSuggestions={() => true}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          onSuggestionSelected={this.handleSelected.bind(this)}
          inputProps={{
            ...this.props as any,
            errorMessage: this.errorMessage,
            classes,
            placeholder: placeholder || 'Pesquisar...',
            required: this.isRequired,
            value: term || '',
            onBlur: this.handleBlur.bind(this),
            onChange: this.handleChange.bind(this),
            endAdornment: (!term ?
              <InputAdornment position='end'>
                <IconButton disabled={true} className={classes.adornment}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
              :
              <InputAdornment position='end' onClick={this.handleClearValue.bind(this)}>
                <IconButton disabled={disabled} className={classes.adornment}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Fragment>
    );
  }

  renderSuggestion(suggestion: IProps['options'][0], { query, isHighlighted }: RenderSuggestionParams) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }
}