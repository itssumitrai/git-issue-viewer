/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { createStore } from 'fluxible/addons';
import RouteStore from './RouteStore';

let IssueListStore = createStore({
    storeName: 'IssueListStore',

    handlers: {
        'ISSUE_FETCH_SUCCESS': '_loadIssues',
        'ISSUE_FETCH_FAILURE': '_handleFailure'
    },

    initialize() {
        this.issues = null;
        this.error = null;
    },

    _loadIssues(issueList) {
        this.issues = issueList;
        this.error = null;
        this.emitChange();
    },

    _handleFailure(error) {
        this.error = error;
        this.emitChange();
    },

    getIssues() {
        return this.issues;
    },

    getError() {
        return this.error;
    },

    dehydrate() {
        return {
            error: this.error,
            issues: this.issues
        };
    },

    rehydrate(state) {
        this.error = state.error;
        this.issues = state.issues;
    }
});

export default IssueListStore;
