/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

const debug = require('debug')('createIssueListAction');

/**
 * fetches all issues for a git repo
 * @param {object} context action context
 * @param {object} params params to the action
 * @param {string} params.owner owner of the git repo
 * @param {string} params.repo exact repo name under a given owner
 * @param {function} done callback function
 */
export default function createIssueList(context, params, done) {
    debug('createIssueList:fetching Git Issues', params);

    context.service.read('repoIssuesService', params, {}, function (err, res) {
        if (err) {
            debug('dispatching ISSUE_FETCH_FAILURE', err);
            context.dispatch('ISSUE_FETCH_FAILURE', err);
            done();
            return;
        }

        debug('dispatching ISSUE_FETCH_SUCCESS', res);
        context.dispatch('ISSUE_FETCH_SUCCESS', res);
        typeof done === 'function' && done();
    });
};