import * as React from "react";
import Autosuggest from "react-autosuggest";
import './AutoComplete.css';

class Autocomplete extends React.Component {
    render() {
        const {value, suggestions, isLoading, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested} = this.props;
        const inputProps = {
            placeholder: "Type 'a'",
            value,
            onChange
        };
        const status = isLoading ? 'Loading...' : 'Type to show suggestions';

        return (
            <div>
                <div className="status">
                    <strong>Status:</strong> {status}
                </div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={Autocomplete.getSuggestionValue}
                    renderSuggestion={Autocomplete.renderSuggestion}
                    inputProps={inputProps}/>
            </div>
        );
    }

    static getSuggestionValue(suggestion) {
        return suggestion;
    }

    static renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        );
    }
}

export {Autocomplete as default};
