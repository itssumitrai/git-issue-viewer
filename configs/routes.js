/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import createIssueList from '../actions/createIssueList';
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
                repo: appConfig.initialGitRepo
            }, done);
        },
        component: require('../components/IssueList')
    },
    issue: {
        path: '/:issueId',
        method: 'get',
        page: 'issue',
        title: 'Issue',
        component: require('../components/Issue')
    }
};
