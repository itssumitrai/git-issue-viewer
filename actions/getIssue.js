/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import async from 'async';
const debug = require('debug')('getIssueAction');

/**
 * fetches details for a given issue
 * @param {Object} context action context
 * @param {Object} params params to the action
 * @param {String} params.owner owner of the git repo
 * @param {String} params.repo exact repo name under a given owner
 * @param {String} params.issueNumber issueNumber to fetch details
 * @param {Object} [params.query] query params for the api call
 * @param {Function} done callback function
 */
export default function getIssue(context, params, done) {
    debug('getIssueAction:fetching Git Issue Details:', params);

    async.parallel({
        fetchIssueDetails: (callback) => {
            debug('getIssueAction:fetchIssueDetails');

            context.service.read('issueService', params, {}, function (err, res) {
                if (err) {
                    debug('getIssueAction: fetchIssueDetails failed:', err);
                    return callback(err, null);
                }

                callback(null, res);
            });
        },
        fetchIssueComments: (callback) => {
            debug('getIssueAction:fetchIssueComments');

            const commentsParams = Object.assign({}, params, { isComment: true });
            context.service.read('issueService', commentsParams, {}, function (err, res) {
                if (err) {
                    debug('getIssueAction: fetchIssueComments failed:', err);
                    return callback(err, null);
                }

                callback(null, res);
            });
        }
    }, (err, results) => {
        if (err) {
            debug('dispatching ISSUE_FAILURE', err);
            context.dispatch('ISSUE_FAILURE', err);
            if (typeof done === 'function') {
                done(err);
            }
            return;
        }

        const storePayload = {
            issue: results.fetchIssueDetails.body,
            comments: results.fetchIssueComments.body
        };

        debug('dispatching ISSUE_SUCCESS', storePayload);

        context.dispatch('ISSUE_SUCCESS', storePayload);

        if (typeof done === 'function') {
            done();
        }
    });
}
