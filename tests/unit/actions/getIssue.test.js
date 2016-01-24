/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import { createMockActionContext } from 'fluxible/utils';
import getIssue from '../../../actions/getIssue';
import assertDispatch from '../../utils/assertDispatch';
import serviceMock from '../../mocks/serviceMock';
import sinon from 'sinon';

describe('getIssue', function () {
    let context;
    let params;
    let resData;

    beforeEach(function () {
        context = createMockActionContext();
        context.service = serviceMock;

        params = {
            owner: 'npm',
            repo: 'npm',
            issueNumber: 12345
        };

        resData = {
            issue: {
                id: '1',
                title: 'This is some issue',
                number: 12345
            },
            comments: [{
                title: 'this is comment 1'
            }, {
                title: 'this is comment 2'
            }]
        };
    });

    it('should dispatch ISSUE_SUCCESS if the issueService returns data', function () {
        let done = sinon.spy();
        assertDispatch(context, getIssue, params, done, ['ISSUE_SUCCESS'], [resData]);
        expect(done.called).to.be.true;
    });

    it('should dispatch ISSUE_SUCCESS without done if done is not proper function', function () {
        let done = {};
        assertDispatch(context, getIssue, params, done, ['ISSUE_SUCCESS'], [resData]);
    });

    it('should dispatch ISSUE_FAILURE if the issue detail Service call returns error', function () {
        let done = sinon.spy();
        params.issueNumber = 11111;
        assertDispatch(context, getIssue, params, done, ['ISSUE_FAILURE'], ['Boom!']);
        expect(done.called).to.be.true;
    });

    it('should dispatch ISSUE_FAILURE if the comments Service call returns error', function () {
        let done = sinon.spy();
        params.issueNumber = 22222;
        assertDispatch(context, getIssue, params, done, ['ISSUE_FAILURE'], ['Boom!']);
        expect(done.called).to.be.true;
    });

    it('should dispatch ISSUE_FAILURE without done if done is not proper function', function () {
        let done = {};
        params.owner = 'fail';
        assertDispatch(context, getIssue, params, done, ['ISSUE_FAILURE'], ['Boom!']);
    });
});