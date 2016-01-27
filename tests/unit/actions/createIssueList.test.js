/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import { createMockActionContext } from 'fluxible/utils';
import createIssueList from '../../../actions/createIssueList';
import assertDispatch from '../../utils/assertDispatch';
import serviceMock from '../../mocks/serviceMock';
import sinon from 'sinon';

describe('createIssueList', function () {
    let context;
    let params;
    let resData;

    beforeEach(function () {
        resData = {
            paginationInfo: {
                next: '2',
                last: '75'
            },
            issues: [{
                id: '1',
                title: 'This is some issue',
                number: 12345
            }, {
                id: '2',
                title: 'This is another issue',
                number: 12346
            }]
        };

        context = createMockActionContext();
        context.service = serviceMock;

        params = {
            owner: 'npm',
            repo: 'npm',
            query: {
                page: '1',
                'per_page': '25'
            }
        };
    });

    it('should dispatch ISSUE_FETCH_SUCCESS if the issueService returns data', function () {
        let done = sinon.spy();
        assertDispatch(context, createIssueList, params, done, ['ISSUE_FETCH_SUCCESS'], [resData]);
        expect(done.called).to.be.true;
    });

    it('should dispatch ISSUE_FETCH_SUCCESS without done if done is not proper function', function () {
        let done = {};
        assertDispatch(context, createIssueList, params, done, ['ISSUE_FETCH_SUCCESS'], [resData]);
    });

    it('should dispatch ISSUE_FETCH_FAILURE if the issueService returns error', function () {
        let done = sinon.spy();
        params.owner = 'fail';
        assertDispatch(context, createIssueList, params, done, ['ISSUE_FETCH_FAILURE'], ['Boom!']);
        expect(done.called).to.be.true;
    });

    it('should dispatch ISSUE_FETCH_FAILURE without done if done is not proper function', function () {
        let done = {};
        params.owner = 'fail';
        assertDispatch(context, createIssueList, params, done, ['ISSUE_FETCH_FAILURE'], ['Boom!']);
    });
});