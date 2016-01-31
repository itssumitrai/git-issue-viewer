/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';
import Immutable from 'immutable';
import { createMockComponentContext } from 'fluxible/utils';
import IssueListStore from '../../../stores/IssueListStore';
import issuesMockData from '../../data/issueListServiceResponse.json';
import fluxibleAddonsReactMock from '../../mocks/fluxibleAddonsReact';
import sinon from 'sinon';

describe('IssueList', function () {
    let IssueList;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('./IssueList/IssueListItem', jsx.stubComponent('IssueListItem', null, true));
        mockery.registerMock('./Shared/ItemLayout', jsx.stubComponent('ItemLayout', null, true));
        mockery.registerMock('./Shared/UserTile', jsx.stubComponent('UserTile', null, true));
        mockery.registerMock('./Shared/ScrollUp', jsx.stubComponent('ScrollUp', null, true));
        mockery.registerMock('./Shared/RepoSelector', jsx.stubComponent('RepoSelector', null, true));
        mockery.registerMock('./IssueList/PaginationBar', jsx.stubComponent('PaginationBar', null, true));
        mockery.registerMock('fluxible-addons-react', fluxibleAddonsReactMock);
        IssueList = require('../../../components/IssueList');
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
                stores: [IssueListStore]
            });

            props = {
                routeParams: Immutable.fromJS({
                    owner: 'npm',
                    repo: 'npm',
                    page: '2'
                }),
                context: context,
                issues: issuesMockData,
                error: null,
                isLoading: false,
                paginationInfo: {
                    first: 1,
                    last: 75,
                    next: 3,
                    prev: 1
                }
            };
        });

        it('should render RepoSelector', function () {
            jsx.assertRender(IssueList, props,
                '<RepoSelector data-owner="npm" data-repo="npm"></RepoSelector>'
            );
        });

        it('should render pagination bars', function () {
            jsx.assertRender(IssueList, props,
                '<PaginationBar data-paginationinfo* data-routeparams*  data-pagenumber="2"></PaginationBar>*' +
                '<PaginationBar data-paginationinfo* data-routeparams*  data-pagenumber="2"></PaginationBar>'
            );
        });

        it('should render list of issues', function () {
            let assertString = '<ul+>';
            props.issues.forEach(function () {
                assertString += '<li><ItemLayout+></ItemLayout></li>';
            });
            assertString += '</ul>';

            jsx.assertRender(IssueList, props, assertString);
        });

        it('should render scrollup component', function () {
            jsx.assertRender(IssueList, props,
                '<ScrollUp></ScrollUp>'
            );
        });

        it('should render spinner if `isLoading=true`', function () {
            props.isLoading = true;
            jsx.assertRender(IssueList, props,
                '<section class="spinner"+><div+></div></section>'
            );
        });

        it('should render error message if no `issues` was provided and `error` is true', function () {
            props.issues = null;
            props.error = 'UnAuthorized Error';
            jsx.assertRender(IssueList, props,
                '<section+>UnAuthorized Error</section>'
            );
        });

        it('should change issueList when props are changed', function () {
            let component = jsx.renderComponent(IssueList, props);
            component.componentWillReceiveProps({
                routeParams: Immutable.fromJS({
                    owner: 'yahoo',
                    repo: 'fluxible',
                    page: '5'
                })
            });

            expect(component.state).to.deep.equal({
                owner: 'yahoo',
                repo: 'fluxible',
                pageNumber: '5',
                scrollVisible: false
            });
        });

        it('should not change issueList when the same props are passed again', function () {
            let component = jsx.renderComponent(IssueList, props);
            sinon.spy(component, 'setState');
            component.componentWillReceiveProps({
                routeParams: Immutable.fromJS({
                    owner: 'npm',
                    repo: 'npm',
                    page: '2'
                })
            });

            expect(component.setState.called).to.be.false;
        });

        it('should not render anything if no `issues` was provided and `isLoading` is false', function () {
            props.issues = null;
            props.isLoading = false;
            jsx.assertRender(IssueList, props,
                '<section aria-label="Error Message">Could not get Data</section>'
            );
        });
    });
});
