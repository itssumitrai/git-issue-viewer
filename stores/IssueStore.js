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
        this.issueNumber = null;    // acts as an id so we know we are fetching the right issue
        this.issue = null;
        this.error = null;
    },

    _loadIssue(payload) {
        this.issue = payload.issue;
        this.comments = payload.comments;
        this.issueNumber = payload.issue.number;
        this.error = null;
        this.emitChange();
    },

    _handleFailure(error) {
        this.error = error;
        this.emitChange();
    },

    getCurrentIssue(issueNumber) {
        if (issueNumber === this.issueNumber || this.issueNumber === null) {
            return this.issue;
        }
    },

    getComments(issueNumber) {
        if (issueNumber === this.issueNumber) {
            return this.comments;
        }
    },

    getError(issueNumber) {
        if (issueNumber === this.issueNumber) {
            return this.error;
        }
    },

    dehydrate() {
        return {
            error: this.error,
            issue: this.issue,
            comments: this.comments,
            issueNumber: this.issueNumber
        };
    },

    rehydrate(state) {
        this.error = state.error;
        this.issue = state.issue;
        this.comments = state.comments;
        this.issueNumber = state.issueNumber;
    }
});

export default IssueListStore;
