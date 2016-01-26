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
        path: '/:owner/:repo/:page',
        method: 'get',
        page: 'issueList',
        title: 'Issues',
        action: function initializeIssueListPage(context, payload, done) {
            context.executeAction(createIssueList, {
                owner: payload.getIn(['params', 'owner']),
                repo: payload.getIn(['params', 'repo']),
                query: {
                    page: payload.getIn(['params', 'page']),
                    'per_page': appConfig.itemsPerPage
                }
            }, done);
        },
        component: require('../components/IssueList')
    },
    issue: {
        path: '/:owner/:repo/issue/:issueNumber',
        method: 'get',
        page: 'issue',
        title: 'Issue',
        action: function initializeIssuePage(context, payload, done) {
            context.executeAction(getIssue, {
                owner: payload.getIn(['params', 'owner']),
                repo: payload.getIn(['params', 'repo']),
                issueNumber: payload.getIn(['params', 'issueNumber'])
            }, done);
        },
        component: require('../components/IssueDetail')
    }
};
