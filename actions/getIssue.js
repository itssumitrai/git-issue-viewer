/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

const debug = require('debug')('getIssueAction');

/**
 * fetches details for a given issue
 * @param {object} context action context
 * @param {object} params params to the action
 * @param {string} params.owner owner of the git repo
 * @param {string} params.repo exact repo name under a given owner
 * @param {string} params.issueNumber issueNumber to fetch details
 * @param {object} [params.query] query params for the api call
 * @param {function} done callback function
 */
export default function getIssue(context, params, done) {
    debug('getIssueAction:fetching Git Issue', params);

    context.service.read('issueService', params, {}, function (err, res) {
        if (err) {
            debug('dispatching ISSUE_FAILURE', err);
            context.dispatch('ISSUE_FAILURE', err);
            done();
            return;
        }

        debug('dispatching ISSUE_SUCCESS', res);
        context.dispatch('ISSUE_SUCCESS', res);
        typeof done === 'function' && done();
    });
};