/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import mockery from 'mockery';
import requestMock from '../../mocks/requestMock';
import { expect } from 'chai';

describe('issueService', function () {
    var issueService;
    var req = {};

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('request', requestMock);
        issueService = require('../../../services/issueService');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#read', function () {
        it('should return list of issues for a correct issueList request', function () {
            var params = {
                owner: 'npm',
                repo: 'npm'
            };
            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.have.property('body')
                    .that.is.an('array');
                expect(res.body).to.have.length(25);
                expect(res.body[0]).to.contain.all.keys(['url', 'comments_url', 'labels_url', 'events_url',
                    'html_url', 'id', 'number', 'title', 'user', 'labels', 'state', 'locked',
                    'assignee', 'milestone', 'comments', 'created_at', 'updated_at', 'closed_at',
                    'pull_request', 'body']);
                expect(res.body[0].user).to.contain.all.keys(['login', 'id', 'avatar_url', 'gravatar_id',
                    'url', 'html_url', 'followers_url', 'following_url', 'gists_url',
                    'starred_url', 'subscriptions_url', 'organizations_url', 'repos_url',
                    'events_url', 'received_events_url', 'type', 'site_admin']);
                expect(res.body[0].labels).to.be.instanceof(Array);
            });
        });

        it('should return all the details for a correct issue detail request', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11217'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.contain.all.keys(['url', 'comments_url', 'labels_url', 'events_url',
                    'html_url', 'id', 'number', 'title', 'user', 'labels', 'state', 'locked',
                    'assignee', 'milestone', 'comments', 'created_at', 'updated_at', 'closed_at',
                    'closed_by', 'body']);
                expect(res.body.user).to.contain.all.keys(['login', 'id', 'avatar_url', 'gravatar_id',
                    'url', 'html_url', 'followers_url', 'following_url', 'gists_url',
                    'starred_url', 'subscriptions_url', 'organizations_url', 'repos_url',
                    'events_url', 'received_events_url', 'type', 'site_admin']);
                expect(res.body.number).to.equal(11217);
            });
        });

        it('should return all comments for a correct issue detail comments request', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11217',
                isComment: true
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.have.property('body')
                    .that.is.an('array');
                expect(res.body[0]).to.contain.all.keys(['url', 'html_url', 'issue_url', 'id', 'user', 'created_at',
                    'updated_at', 'body']);
                expect(res.body[0].user).to.contain.all.keys(['login', 'id', 'avatar_url', 'gravatar_id',
                    'url', 'html_url', 'followers_url', 'following_url', 'gists_url',
                    'starred_url', 'subscriptions_url', 'organizations_url', 'repos_url',
                    'events_url', 'received_events_url', 'type', 'site_admin']);
                expect(res.body[0].issue_url).to.equal('https://api.github.com/repos/npm/npm/issues/11217');
            });
        });

        it('should return list of issues for a correct issueList request with queryParams', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                query: {
                    page: '2',
                    'per_page': '5'
                }
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.have.property('body')
                    .that.is.an('array');
                expect(res.body).to.have.length(5);
                expect(res.body[0]).to.contain.all.keys(['url', 'comments_url', 'labels_url', 'events_url',
                    'html_url', 'id', 'number', 'title', 'user', 'labels', 'state', 'locked',
                    'assignee', 'milestone', 'comments', 'created_at', 'updated_at', 'closed_at',
                    'body']);
                expect(res.body[0].user).to.contain.all.keys(['login', 'id', 'avatar_url', 'gravatar_id',
                    'url', 'html_url', 'followers_url', 'following_url', 'gists_url',
                    'starred_url', 'subscriptions_url', 'organizations_url', 'repos_url',
                    'events_url', 'received_events_url', 'type', 'site_admin']);
                expect(res.body[0].labels).to.be.instanceof(Array);
            });
        });

        it('should return error if the http response returns error', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11218'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Boom!');
                expect(res).to.be.null;
            });
        });

        it('should return error if the http response is not ok (200)', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11219'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Maximum number of login attempts exceeded. Please try again later.');
                expect(err).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.be.null;
            });
        });

        it('should return error if the http response is not ok (200) and no message in response', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11222'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Internal Server Error. HTTP Status 403 received');
                expect(err).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.be.null;
            });
        });

        it('should return error if body is falsy', function () {
            var params = {
                owner: 'npm',
                repo: 'npm',
                issueNumber: '11220'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('statusCode')
                    .that.equals(500);
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Internal Server Error. HTTP Status 500 received');
                expect(err).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.be.null;
            });
        });

        it('should return 404 if body is an empty array for list call', function () {
            var params = {
                owner: 'yahoo',
                repo: 'fluxible'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('statusCode')
                    .that.equals(404);
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Not Found');
                expect(err).to.have.property('headers')
                    .that.is.an('object');
                expect(res).to.be.null;
            });
        });

        it('should return error when no params provided', function () {
            issueService.read(req, 'issueService', null, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Required Params for rest call must have `owner` and `repo`');
                expect(res).to.be.null;
            });
        });

        it('should return error when owner is not provided', function () {
            var params = {
                repo: 'npm'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Required Params for rest call must have `owner` and `repo`');
                expect(res).to.be.null;
            });
        });

        it('should return error when repo is not provided', function () {
            var params = {
                owner: 'npm'
            };

            issueService.read(req, 'issueService', params, {}, function (err, res) {
                expect(err).to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Required Params for rest call must have `owner` and `repo`');
                expect(res).to.be.null;
            });
        });
    });
});