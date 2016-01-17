/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import createIssueList from '../actions/createIssueList';

const GIT_OWNER = 'npm';
const GIT_REPO = 'npm';

export default {
    issueList: {
        path: '/',
        method: 'get',
        page: 'issueList',
        title: 'Issues',
        action: function (context, payload, done) {
            context.executeAction(createIssueList, {
                owner: GIT_OWNER,
                repo: GIT_REPO
            }, done);
        }
    },
    issue: {
        path: '/about',
        method: 'get',
        page: 'issue',
        title: 'Issue'
    }
};
