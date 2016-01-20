/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import async from 'async';
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
    debug('getIssueAction:fetching Git Issue Details:', params);

    async.parallel({
        fetchIssueDetails: (callback) => {
            context.service.read('issueService', params, {}, function (err, res) {
                if (err) {
                    debug('getIssueAction: fetchIssueDetails failed:', err);
                    return callback(err, null);
                }

                callback(null, res);
            });
        },
        fetchIssueComments: (callback) => {
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

        const resultData = {
            issue: results.fetchIssueDetails,
            comments: results.fetchIssueComments
        };

        debug('dispatching ISSUE_SUCCESS', resultData);
        context.dispatch('ISSUE_SUCCESS', resultData);
        if (typeof done === 'function') {
            done();
        }
    });
}
