/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import createIssueList from '../actions/createIssueList';
import getIssue from '../actions/getIssue';
import appConfig from './app';

export default {
    issueList: {
        path: '/',
        method: 'get',
        page: 'issueList',
        title: 'Issues',
        action: function (context, payload, done) {
            context.executeAction(createIssueList, {
                owner: appConfig.initialGitOwner,
                repo: appConfig.initialGitRepo,
                query: {
                    page: 1,
                    per_page: 25
                }
            }, done);
        },
        component: require('../components/IssueList')
    },
    issue: {
        path: '/:issueNumber',
        method: 'get',
        page: 'issue',
        title: 'Issue',
        action: function (context, payload, done) {
            context.executeAction(getIssue, {
                owner: appConfig.initialGitOwner,
                repo: appConfig.initialGitRepo,
                issueNumber: payload.getIn(['params', 'issueNumber'])
            }, done);
        },
        component: require('../components/IssueDetail')
    }
};
