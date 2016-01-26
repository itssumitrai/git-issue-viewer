/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

describe('routes', function () {
    let routes;
    let context = { executeAction: sinon.spy() };

    before(function () {
        routes = require('../../../configs/routes');
    });

    describe('#route: issueList', function () {
        it('should have all necessary keys', function () {
            expect(routes.issueList).to.contain.all.keys(['path', 'method', 'page', 'title',
                'action', 'component']);
        });

        it('should have initialize action', function () {
            const payload = Immutable.fromJS({
                params: {
                    owner: 'npm',
                    repo: 'npm',
                    page: '1'
                }
            });

            expect(routes.issueList.action).to.be.a.function;
            (routes.issueList.action)(context, payload, function () {
                expect(context.executeAction.called).to.be.true;
            });
        });
    });

    describe('#route: issue', function () {
        it('should have all necessary keys', function () {
            expect(routes.issue).to.contain.all.keys(['path', 'method', 'page', 'title',
                'action', 'component']);
        });

        it('should have initialize action', function () {
            const payload = Immutable.fromJS({
                params: {
                    owner: 'npm',
                    repo: 'npm',
                    issueNumber: '12345'
                }
            });

            expect(routes.issue.action).to.be.a.function;
            (routes.issue.action)(context, payload, function () {
                expect(context.executeAction.called).to.be.true;
            });
        });
    });
});