/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { createStore } from 'fluxible/addons';
import RouteStore from './RouteStore';

let IssueListStore = createStore({
    storeName: 'IssueStore',

    handlers: {
        'ISSUE_SUCCESS': '_loadIssue',
        'ISSUE_FAILURE': '_handleFailure'
    },

    initialize() {
        this.issue = [];
        this.error = null;
    },

    _loadIssue(issue) {
        this.issue = issue;
        this.error = null;
        this.emitChange();
    },

    _handleFailure(error) {
        this.error = error;
        this.emitChange();
    },

    getCurrentIssue() {
        return this.issue;
    },

    dehydrate() {
        return {
            error: this.error,
            issue: this.issue
        };
    },

    rehydrate(state) {
        this.error = state.error;
        this.issue = state.issue;
    }
});

export default IssueListStore;