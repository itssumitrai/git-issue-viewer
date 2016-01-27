/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

const debug = require('debug')('createIssueListAction');

/**
 * fetches all issues for a git repo
 * @param {Object} context action context
 * @param {Object} params params to the action
 * @param {String} params.owner owner of the git repo
 * @param {String} params.repo exact repo name under a given owner
 * @param {Object} [params.query] query params for the api call
 * @param {Function} done callback function
 */
export default function createIssueList(context, params, done) {
    debug('createIssueList:fetching Git Issues', params);

    context.service.read('issueService', params, {}, function (err, res) {
        if (err) {
            debug('dispatching ISSUE_FETCH_FAILURE', err);
            context.dispatch('ISSUE_FETCH_FAILURE', err);
            if (typeof done === 'function') {
                done(err);
            }
            return;
        }

        // Now extract link header information and send it along to store
        // we don't need to process other headers at this point of time, so no point in sending to store
        const storePayload = {
            paginationInfo: res.headers.link,
            issues: res.body
        };

        debug('dispatching ISSUE_FETCH_SUCCESS', storePayload);

        context.dispatch('ISSUE_FETCH_SUCCESS', storePayload);

        if (typeof done === 'function') {
            done();
        }
    });
}
