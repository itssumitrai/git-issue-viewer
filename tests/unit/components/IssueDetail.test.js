/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';
import { expect } from 'chai';
import jsx from 'jsx-test';
import mockery from 'mockery';
import Immutable from 'immutable';
import { createMockComponentContext } from 'fluxible/utils';
import IssueStore from '../../../stores/IssueStore';
import commentsMockData from '../../data/issueDetailCommentsResponse.json';
import issueMockData from '../../data/issueDetailServiceResponse.json';
import fluxibleAddonsReactMock from '../../mocks/fluxibleAddonsReact';

describe('IssueDetail', function () {
    let IssueDetail;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('./IssueDetail/IssueDetailHeader', jsx.stubComponent('IssueDetailHeader', null, true));
        mockery.registerMock('./IssueDetail/Comment', jsx.stubComponent('Comment', null, true));
        mockery.registerMock('./Shared/ItemLayout', jsx.stubComponent('ItemLayout', null, true));
        mockery.registerMock('./Shared/UserTile', jsx.stubComponent('UserTile', null, true));
        mockery.registerMock('./Shared/ScrollUp', jsx.stubComponent('ScrollUp', null, true));
        mockery.registerMock('./Shared/RepoSelector', jsx.stubComponent('RepoSelector', null, true));
        mockery.registerMock('fluxible-addons-react', fluxibleAddonsReactMock);
        IssueDetail = require('../../../components/IssueDetail');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        let context;

        beforeEach(function () {
            context = createMockComponentContext({
                stores: [IssueStore]
            });

            props = {
                routeParams: Immutable.fromJS({
                    owner: 'npm',
                    repo: 'npm',
                    issueNumber: '12345'
                }),
                context: context,
                issue: issueMockData,
                comments: commentsMockData,
                error: null
            };
        });

        it('should render RepoSelector', function () {
            jsx.assertRender(IssueDetail, props,
                '<RepoSelector data-owner="npm" data-repo="npm" data-headinglink="true"></RepoSelector>'
            );
        });

        it('should render detail header', function () {
            jsx.assertRender(IssueDetail, props,
                '<IssueDetailHeader data-issue+></IssueDetailHeader>'
            );
        });

        it('should render list of comments', function () {
            jsx.assertRender(IssueDetail, props,
                '<ul>' +
                    '<li><ItemLayout data-left* data-right+></ItemLayout></li>' +
                    '<li><ItemLayout data-left* data-right+></ItemLayout></li>' +
                '</ul>'
            );
        });

        it('should render scrollup component', function () {
            jsx.assertRender(IssueDetail, props,
                '<ScrollUp></ScrollUp>'
            );
        });

        it('should render spinner if no `issue` was provided', function () {
            props.issue = null;
            jsx.assertRender(IssueDetail, props,
                '<div class="spinner"><div+></div></div>'
            );
        });

        it('should render error message if no `issue` was provided and `error` is true', function () {
            props.issue = null;
            props.error = 'UnAuthorized Error';
            jsx.assertRender(IssueDetail, props,
                '<div>UnAuthorized Error</div>'
            );
        });
    });
});