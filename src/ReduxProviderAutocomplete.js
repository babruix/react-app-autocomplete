import React from 'react';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as AUTOCOMPLETE from './Constants';
import AutocompleteConnected from './AutocompleteConnected'

const { createStore, applyMiddleware } = Redux;
const { Provider } = ReactRedux;

// Reducer for Redux
const initialState = {
    value: '',
    suggestions: [],
    isLoading: false
};

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case AUTOCOMPLETE.UPDATE_SEARCH_VALUE:
            return {
                ...state,
                value: action.value
            };

        case AUTOCOMPLETE.SUGGESTIONS_CLEAR:
            return {
                ...state,
                suggestions: []
            };

        case AUTOCOMPLETE.SUGGESTIONS_LOAD:
            return {
                ...state,
                isLoading: true
            };

        case AUTOCOMPLETE.SUGGESTIONS_UPDATE:
            if (action.value !== state.value) {
                return {
                    ...state,
                    isLoading: false
                };
            }

            return {
                ...state,
                suggestions: action.suggestions,
                isLoading: false
            };

        default:
            return state;
    }
}

function thunkMiddleware(_ref) {
    const dispatch = _ref.dispatch;
    const getState = _ref.getState;

    return function (next) {
        return function (action) {
            return typeof action === 'function'
                ? action(dispatch, getState)
                : next(action);
        };
    };
}

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

function ReduxProviderAutocomplete() {
    return (
        <Provider store={store}>
            <AutocompleteConnected />
        </Provider>
    );
}

export default ReduxProviderAutocomplete;