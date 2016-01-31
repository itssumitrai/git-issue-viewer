/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';
import Immutable from 'immutable';
import ReactTestUtils from 'react-addons-test-utils';
import { createMockComponentContext } from 'fluxible/utils';
import fluxibleAddonsReactMock from '../../mocks/fluxibleAddonsReact';
import fluxibleRouterMock from '../../mocks/fluxibleRouterMock';
import reactIntlMock from '../../mocks/reactIntlMock';

describe('Application', function () {
    let Application;
    let TestParent;

    let ApplicationStore = function(){};
    ApplicationStore.storeName = 'ApplicationStore';
    ApplicationStore.prototype.getPageTitle = function () {
        return 'Issues from npm/npm';
    };

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('fluxible-addons-react', fluxibleAddonsReactMock);
        mockery.registerMock('fluxible-router', fluxibleRouterMock);
        mockery.registerMock('../components/IssueList', jsx.stubComponent('ItemList', null, true));
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('../stores/ApplicationStore', ApplicationStore);
        Application = require('../../../components/Application');
        TestParent = require('../../mocks/TestParentComponent');
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
                stores: [ApplicationStore]
            });

            props = {
                currentRoute: Immutable.fromJS({
                    component: 'IssueList',
                    params: {
                        owner: 'npm',
                        repo: 'npm'
                    },
                    title: 'Issues from npm/npm'
                }),
                pageTitle: 'Issues from npm/npm',
                context: context
            };
        });

        it('should render given component with IntlProvider', function () {
            jsx.assertRender(Application, props,
                '<div><IntlProvider><IssueList></IssueList></IntlProvider></div>'
            );
        });

        it('should update pageTitle when title changes', function () {
            let testProps = {
                Component: Application,
                compProps: props
            };

            let testComponent = jsx.renderComponent(TestParent, testProps);
            let application = ReactTestUtils.findRenderedComponentWithType(testComponent, Application);

            expect(application.props.pageTitle).to.equal('Issues from npm/npm');

            // Now update pageTitle
            testProps.compProps.pageTitle = 'Issues from yahoo/fluxible';
            testComponent.setState(testProps);

            expect(application.props.pageTitle).to.equal('Issues from yahoo/fluxible');

            // Now set the same title for code coverage
            testComponent.setState(testProps);
        });
    });
});
