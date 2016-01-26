/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';
import { expect } from 'chai';

import jsx from 'jsx-test';
import mockery from 'mockery';
import reactIntlMock from '../../../mocks/reactIntlMock';
import fluxibleRouterMock from '../../../mocks/fluxibleRouterMock';

describe('RepoSelector', function () {
    let RepoSelector;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('fluxible-router', fluxibleRouterMock);
        RepoSelector = require('../../../../components/Shared/RepoSelector');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                owner: 'npm',
                repo: 'npm',
                headingLink: false
            };
        });

        it('should render the repo form', function () {
            jsx.assertRender(RepoSelector, props,
                '<div+><span+></span><span+>npm / npm</span></div>'
            );
        });

        it('should render the heading', function () {
            jsx.assertRender(RepoSelector, props,
                '<h2+><span>All Issues from npm/npm</span></h2>'
            );
        });

        it('should render heading as link if `headlingLink=true`', function () {
            props.headingLink = true;
            jsx.assertRender(RepoSelector, props,
                '<div+>' +
                    '<h2 class="hidden-text"><span>All Issues from npm/npm</span></h2>' +
                    '<a *href="/npm/npm/1"><span>All Issues from npm/npm</span></a>' +
                '</div>'
            );
        });
    });
});