/* globals beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import { createMockActionContext } from 'fluxible/utils';
import IssueListStore from '../../../stores/IssueListStore';

describe('IssueListStore', function () {
    let context;
    let store;
    let newState;
    let data;

    beforeEach(function () {
        context = createMockActionContext({
            stores: [IssueListStore]
        });
        store = context.getStore(IssueListStore);

        data = {
            paginationInfo: '<https://api.github.com/repositories/321278/issues?page=2&per_page=25>; rel="next", ' +
                '<https://api.github.com/repositories/321278/issues?page=75&per_page=25>; rel="last"',
            issues: [{
                id: '1',
                title: 'this is issue 1'
            }, {
                id: '2',
                title: 'this is issue 2'
            }]
        };

        newState = {
            error: 'Boom!',
            issues: [{
                id: '1',
                title: 'this is issue 1'
            }, {
                id: '2',
                title: 'this is issue 2'
            }],
            loading: true,
            pageInfo: 'some page info'
        };

    });

    describe('#initialize', function () {
        it('should initialize the store', function () {
            store.initialize();
            expect(store.dehydrate()).to.deep.equal({
                issues: null,
                error: null,
                loading: false,
                pageInfo: null
            });
        });
    });

    describe('#_loadIssues', function () {
        it('should handle ISSUE_FETCH_SUCCESS', function () {
            store.on('change', function () {
                expect(store.getIssues()).deep.equal(data.issues);
                expect(store.isLoading()).to.be.false;
                expect(store.getError()).to.be.null;
                expect(store.getPageInfo()).equal(data.paginationInfo);
            });

            context.dispatch('ISSUE_FETCH_SUCCESS', data);
        });
    });

    describe('#_handleFailure', function () {
        it('should handle ISSUE_FETCH_FAILURE', function () {
            store.on('change', function () {
                expect(store.getError()).to.equal('Boom!');
            });

            context.dispatch('ISSUE_FETCH_FAILURE', 'Boom!');
        });
    });

    describe('#_handleStartNavigation', function () {
        it('should handle NAVIGATE_START', function () {
            store.on('change', function () {
                expect(store.isLoading()).to.be.true;
            });

            context.dispatch('NAVIGATE_START');
        });
    });

    describe('#getIssues', function () {
        it('should return list of issues', function () {
            store.rehydrate(newState);
            expect(store.getIssues()).deep.equal(newState.issues);
        });
    });

    describe('#getError', function () {
        it('should return the store error', function () {
            store.rehydrate({
                error: 'Boom!',
                issues: [],
                loading: true,
                pageInfo: 'something'
            });
            expect(store.getError()).equal('Boom!');
        });
    });

    describe('#getPageInfo', function () {
        it('should return the store page info', function () {
            store.rehydrate(newState);
            expect(store.getPageInfo()).equal('some page info');
        });
    });

    describe('#isLoading', function () {
        it('should return loading state of store', function () {
            store.rehydrate(newState);
            expect(store.isLoading()).to.be.true;
        });
    });

    describe('#dehydrate', function () {
        it('should dehydrate store', function () {
            expect(store.dehydrate()).to.deep.equal({
                issues: null,
                error: null,
                loading: false,
                pageInfo: null
            });
        });
    });

    describe('#rehydrate', function () {
        it('should rehydrate store', function () {
            store.rehydrate(newState);
            expect(store.getIssues()).to.deep.equal(newState.issues);
            expect(store.isLoading()).to.be.true;
            expect(store.getError()).to.equal('Boom!');
            expect(store.getPageInfo()).equal('some page info');
        });
    });
});