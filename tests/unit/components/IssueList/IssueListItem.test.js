/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';
import { expect } from 'chai';
import jsx from 'jsx-test';
import Immutable from 'immutable';
import mockery from 'mockery';
import reactIntlMock from '../../../mocks/reactIntlMock';
import fluxibleRouterMock from '../../../mocks/fluxibleRouterMock';

describe('IssueListItem', function () {
    let IssueListItem;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('fluxible-router', fluxibleRouterMock);
        mockery.registerMock('../Shared/IssueDate', jsx.stubComponent('IssueDate', null, true));
        mockery.registerMock('../Shared/Labels', jsx.stubComponent('Labels', null, true));
        mockery.registerMock('../Shared/IssueState', jsx.stubComponent('IssueState', null, true));
        IssueListItem = require('../../../../components/IssueList/IssueListItem');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        let issue;
        beforeEach(function () {
            issue = require('../../../data/issueDetailServiceResponse.json');

            props = {
                issue: issue,
                routeParams: Immutable.fromJS({
                    owner: 'npm',
                    repo: 'npm'
                })
            };
        });

        it('should render Issue title', function () {
            jsx.assertRender(IssueListItem, props,
                '<div+>' +
                    '<div+>' +
                        '<a *title="Go to Issue #11217" href="/npm/npm/issue/11217">' +
                            'Cannot find module &#x27;read-package-json&#x27;</a>'
            );
        });

        it('should render Issue Number', function () {
            jsx.assertRender(IssueListItem, props,
                '<div+>' +
                    '<div+>*' +
                        '<a *title="Go to Issue #11217" href="/npm/npm/issue/11217"><span>#11217</span></a>'
            );
        });

        it('should render Issue State', function () {
            jsx.assertRender(IssueListItem, props,
                '<IssueState data-state="open"+></IssueState>'
            );
        });

        it('should render Issue Labels', function () {
            jsx.assertRender(IssueListItem, props,
                '<Labels data-labels=""></Labels>'
            );
        });

        it('should render Issue Summary', function () {
            jsx.assertRender(IssueListItem, props,
                '<p class="summary Ov-h Lh-20px">'
            );
        });

        it('should render number of comments', function () {
            jsx.assertRender(IssueListItem, props,
                '<span>1 comments</span>'
            );
        });

        it('should render created date', function () {
            jsx.assertRender(IssueListItem, props,
                '<IssueDate *data-datetype="list" data-date="2016-01-20T10:50:02Z"></IssueDate>'
            );
        });
    });
});