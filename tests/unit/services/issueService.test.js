/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

describe('issueService', function () {
    var issueService;
    var req;

    before(function () {
        issueService = require('../../../services/issueService');
        req = {};
    });

    describe('#read', function () {
        it('should return correct response when owner and repo are provided', function () {
            var params = {
                owner: 'npm',
                repo: 'npm'
            };
        });

        it('should return error when service call fails', function () {

        });

        it('should return error when params is not provided', function () {

        });

        it('should return error when owner is not provided', function () {

        });

        it('should return error when repo is not provided', function () {

        });
    });
});