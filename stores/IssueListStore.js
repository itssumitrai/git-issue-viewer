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
        'ISSUE_FETCH_FAILURE': '_handleFailure',
        'NAVIGATE_START': '_handleStartNavigation'
    },

    initialize() {
        this.issues = null;
        this.error = null;
        this.loading = false;
        this.pageInfo = {};
    },

    _loadIssues(payload) {
        this.pageInfo = payload.paginationInfo;
        this.issues = payload.issues;
        this.error = null;
        this.loading = false;
        this.emitChange();
    },

    _handleFailure(error) {
        this.error = error;
        this.emitChange();
    },

    _handleStartNavigation() {
        this.loading = true;
        this.emitChange();
    },

    getIssues() {
        return this.issues;
    },

    getError() {
        return this.error;
    },

    getPageInfo() {
        return this.pageInfo;
    },

    isLoading() {
        return this.loading;
    },

    dehydrate() {
        return {
            error: this.error,
            issues: this.issues,
            loading: this.loading,
            pageInfo: this.pageInfo
        };
    },

    rehydrate(state) {
        this.error = state.error;
        this.issues = state.issues;
        this.loading = state.loading;
        this.pageInfo = state.pageInfo;
    }
});

export default IssueListStore;
