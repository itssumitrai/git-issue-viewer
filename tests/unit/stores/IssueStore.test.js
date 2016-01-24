/* globals beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import { createMockActionContext } from 'fluxible/utils';
import IssueStore from '../../../stores/IssueStore';

describe('IssueStore', function () {
    let context;
    let store;
    let newState;
    let data;

    beforeEach(function () {
        context = createMockActionContext({
            stores: [IssueStore]
        });
        store = context.getStore(IssueStore);

        newState = {
            error: null,
            issue: {
                id: '1',
                number: 12345,
                title: 'this is issue 12345'
            },
            comments: [{
                title: 'this is comment 1'
            }, {
                title: 'this is comment 2'
            }],
            issueNumber: 12345
        };

        data = {
            issue: {
                id: '1',
                number: 12345,
                title: 'this is issue 12345'
            },
            comments: [{
                title: 'this is comment 1'
            }, {
                title: 'this is comment 2'
            }]
        };
    });

    describe('#initialize', function () {
        it('should initialize the store', function () {
            store.initialize();
            expect(store.dehydrate()).to.deep.equal({
                comments: null,
                issue: null,
                error: null,
                issueNumber: null
            });
        });
    });

    describe('#_loadIssue', function () {
        it('should handle ISSUE_SUCCESS', function () {
            store.on('change', function () {
                expect(store.getCurrentIssue(12345)).to.deep.equal(data.issue);
                expect(store.getComments(12345)).to.deep.equal(data.comments);
                expect(store.getError(12345)).to.be.null;
            });

            context.dispatch('ISSUE_SUCCESS', data);
        });
    });

    describe('#_handleFailure', function () {
        it('should handle ISSUE_FAILURE', function () {
            store.rehydrate({
                issueNumber: 12345
            });
            store.on('change', function () {
                expect(store.getError(12345)).to.equal('Boom!');
            });

            context.dispatch('ISSUE_FAILURE', 'Boom!');
        });
    });

    describe('#getCurrentIssue', function () {
        it('should return issue details for a given issue', function () {
            store.rehydrate(newState);
            expect(store.getCurrentIssue(12345)).to.deep.equal(newState.issue);
        });

        it('should return issue details for a given issue for initial case', function () {
            newState.issueNumber = null;
            store.rehydrate(newState);
            expect(store.getCurrentIssue(12345)).to.deep.equal(newState.issue);
        });

        it('should not return issue details if issueNumber doesn\'t match', function () {
            store.rehydrate(newState);
            expect(store.getCurrentIssue(22222)).to.be.undefined;
        });
    });

    describe('#getError', function () {
        let state;
        beforeEach(function () {
            state =  {
                error: 'Boom!',
                issueNumber: 12345
            };
        });

        it('should return the store error for a given issue', function () {
            store.rehydrate(state);
            expect(store.getError(12345)).equal('Boom!');
        });

        it('should not return issue details if issueNumber doesn\'t match', function () {
            store.rehydrate(state);
            expect(store.getError(22222)).to.be.undefined;
        });
    });

    describe('#getComments', function () {
        it('should all comments for a given issue', function () {
            store.rehydrate(newState);
            expect(store.getComments(12345)).to.deep.equal(newState.comments);
        });

        it('should not return comments if issueNumber doesn\'t match', function () {
            store.rehydrate(newState);
            expect(store.getComments(22222)).to.be.undefined;
        });
    });

    describe('#dehydrate', function () {
        it('should dehydrate store', function () {
            expect(store.dehydrate()).to.deep.equal({
                comments: null,
                issue: null,
                error: null,
                issueNumber: null
            });
        });
    });

    describe('#rehydrate', function () {
        it('should rehydrate store', function () {
            newState.error = 'Boom!';
            store.rehydrate(newState);
            expect(store.getCurrentIssue(12345)).to.deep.equal(newState.issue);
            expect(store.getComments(12345)).to.deep.equal(newState.comments);
            expect(store.getError(12345)).to.equal('Boom!');
        });
    });
});