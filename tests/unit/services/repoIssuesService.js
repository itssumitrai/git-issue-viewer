/* globals before, beforeEach, it, describe */

/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

describe('#repoIssuesService', function () {
    var repoIssuesService;
    var req;

    before(function () {
        repoIssuesService = require('../../../services/repoIssuesService');
        req = {};
    });

    describe('#read', function () {
        it('should return correct response when all params are provided', function () {
            var params = {
                owner: 'npm',
                repo: 'npm'
            };

            repoIssuesService.read(req, {}, params, {}, function (err, result) {
                expect(err).to.be.null;
                expect(result).to.equal('sumit');
            });
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