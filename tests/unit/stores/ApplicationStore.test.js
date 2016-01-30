/* globals expect, before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import Immutable from 'immutable';
import { createMockActionContext } from 'fluxible/utils';
import ApplicationStore from '../../../stores/ApplicationStore';

describe('ApplicationStore', function () {
    let context;
    let store;
    let newState;

    beforeEach(function () {
        context = createMockActionContext({
            stores: [ApplicationStore]
        });
        store = context.getStore(ApplicationStore);

        newState = {
            pageTitle: 'This is the new page title'
        };

    });

    it('should have correct initial state', function () {
        expect(store.getPageTitle()).to.equal('');
    });

    describe('#handlePageTitle', function () {
        it('should handle NAVIGATE_SUCCESS', function () {
            store.on('change', function () {
                expect(store.getPageTitle()).to.equal('List of Issues');
            });

            context.dispatch('NAVIGATE_SUCCESS', Immutable.fromJS({
                url: '/npm/npm/1',
                page: 'issueList',
                params: {
                    owner: 'npm',
                    repo: 'npm'
                },
                title: 'List of Issues'
            }));
        });

        it('should not emit change if title is not available in the current route', function () {
            store.on('change', function () {
                expect.fail();
            });

            context.dispatch('NAVIGATE_SUCCESS', Immutable.fromJS({
                url: '/npm/npm/1',
                page: 'issueList',
                params: {
                    owner: 'npm',
                    repo: 'npm'
                }
            }));
        });
    });

    describe('#getPageTitle', function () {
        it('should return the page title', function () {
            store.rehydrate(newState);
            expect(store.getPageTitle()).to.equal(newState.pageTitle);
        });
    });

    describe('#dehydrate', function () {
        it('should dehydrate store', function () {
            store.rehydrate(newState);
            expect(store.dehydrate()).to.deep.equal(newState);
        });
    });

    describe('#rehydrate', function () {
        it('should rehydrate store', function () {
            store.rehydrate(newState);
            expect(store.getPageTitle()).to.equal(newState.pageTitle);
        });
    });
});
