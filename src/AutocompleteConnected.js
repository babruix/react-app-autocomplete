import * as ReactRedux from "react-redux";
import * as constClass from '../../../Sites/react-app-autocomplete/src/Constants';
import Autocomplete from "./AutoComplete/AutoComplete";
import ApiUtils from './ApiUtils'

const {connect} = ReactRedux;

// Load Data from JSON and create closure for birds
let birds;
ApiUtils.fetchBirds()
    .then(data => birds = data)
    .catch(e => e);

function mapStateToProps(state) {
    const {value, suggestions, isLoading} = state;

    return {
        value,
        suggestions,
        isLoading
    };
}

// Redux creators for actions
function mapDispatchToProps(dispatch) {

    function loadSuggestionsBegin() {
        return {
            type: constClass.SUGGESTIONS_LOAD
        };
    }

    function maybeUpdateSuggestions(suggestions, value) {
        return {
            type: constClass.SUGGESTIONS_UPDATE,
            suggestions,
            value
        };
    }

    function getMatchingBirds(value) {
        // escape special characters
        const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        let matching = birds.filter(bird => regex.test(bird));

        return matching.slice(0, 5);
    }

    function updateInputValue(value) {
        return {
            type: constClass.UPDATE_SEARCH_VALUE,
            value
        };
    }

    function loadSuggestions(value) {
        return dispatch => {
            dispatch(loadSuggestionsBegin());

            // Fake an AJAX call
            dispatch(maybeUpdateSuggestions(getMatchingBirds(value), value));
        };
    }

    function clearSuggestions() {
        return {
            type: constClass.SUGGESTIONS_CLEAR
        };
    }

    return {
        onChange(event, {newValue}) {
            dispatch(updateInputValue(newValue));
        },
        onSuggestionsFetchRequested({value}) {
            dispatch(loadSuggestions(value));
        },
        onSuggestionsClearRequested() {
            dispatch(clearSuggestions());
        }
    };
}

// Connect Autocomplete component to a Redux store
const AutocompleteConnected = connect(mapStateToProps, mapDispatchToProps)(Autocomplete);

export {AutocompleteConnected as default};
