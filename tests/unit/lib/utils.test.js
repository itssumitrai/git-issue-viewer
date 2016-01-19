/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';
import { expect } from 'chai';

describe('utils', function () {
    var utils;

    before(function () {
        utils = require('../../../lib/utils');
    });

    describe('#getPageNumbers', function () {
        it('should generate correct pageNumbers when pagetoShow is odd', function () {
            expect(utils.getPageNumbers(3, 9)).to.deep.equal([]);
        });

        it('should generate correct pageNumbers when pagetoShow is even', function () {
            expect(utils.getPageNumbers(3, 10)).to.deep.equal([]);
        });

        it('should generate correct pageNumbers when pageNumber is small', function () {
            expect(utils.getPageNumbers(1, 9)).to.deep.equal([]);
        });
    });

    describe('#getMiniSummary', function () {
        it('should generate correct miniSummary from given summary', function () {
        });
    });

    describe('#getParsedMarkupContent', function () {
        it('should parse out multi code blocks', function () {
        });

        it('should not parse out multi code blocks if code rule is skipped', function () {
        });

        it('should parse out code blocks', function () {
        });

        it('should not parse out code blocks if code rule is skipped', function () {
        });

        it('should parse out user logins', function () {
        });
    });
});