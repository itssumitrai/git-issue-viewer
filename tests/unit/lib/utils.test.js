/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import headersData from '../../data/headersData.json';

describe('utils', function () {
    var utils;

    before(function () {
        utils = require('../../../lib/utils');
    });

    describe('#getPageNumbers', function () {
        it('should generate correct pageNumbers when pagetoShow is odd', function () {
            expect(utils.getPageNumbers(3, 9)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(utils.getPageNumbers(7, 9)).to.deep.equal([3, 4, 5, 6, 7, 8, 9, 10, 11]);
        });

        it('should generate correct pageNumbers when pagetoShow is even', function () {
            expect(utils.getPageNumbers(3, 10)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            expect(utils.getPageNumbers(7, 10)).to.deep.equal([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        });
    });

    describe('#getMiniSummary', function () {
        let content;
        beforeEach(function () {
            content = 'This is a very very very log text, and its going to be shortened alot by simply cutting off ' +
                'the extra characters. This works by simply doing calculation of characters and then taking substring' +
                'of the original string using those number fo characters. Some additional logic is required to make' +
                'mini summary ends with a clean word. This is done by removing extra chars at the end till the last space';
        });

        it('should generate correct miniSummary from given summary when max chars is given', function () {
            expect(utils.getMiniSummary(content, 60))
                .to.equal('This is a very very very log text, and its going to be ...');
        });

        it('should generate miniSummary of 140 chars from given summary if no max chars is given', function () {
            expect(utils.getMiniSummary(content)).to.equal('This is a very very very log text, and its going ' +
                'to be shortened alot by simply cutting off the extra characters. This works by simply ...');
        });

        it('should just return summary if summary is smaller than max char length', function () {
            expect(utils.getMiniSummary('This is a small summary', 60)).to.equal('This is a small summary');
        });
    });

    describe('#getParsedMarkupContent', function () {
        let content;
        beforeEach(function () {
            content = 'Hi @itssumitrai, how are you doing ?';
        });

        it('should return markup content and convert login occurences into anchor tags', function () {
            expect(utils.getParsedMarkupContent(content, true)).to.deep.equal({
                __html: '<p>Hi <a href=\"https://github.com/itssumitrai\" class=\"link Fw-b C-LinkBlue\">' +
                '@itssumitrai</a>, how are you doing ?</p>\n'
            });
        });

        it('should return markup content without converting login occurences if `parseLogin` is false', function () {
            expect(utils.getParsedMarkupContent(content, false)).to.deep.equal({
                __html: '<p>Hi @itssumitrai, how are you doing ?</p>\n'
            });
        });
    });

    describe('#getTimestamp', function () {
        it('should return timestamp from the given timestring', function () {
            expect(utils.getTimestamp('2016-01-21T20:05:36Z')).to.equal(1453406736000);
        });
    });

    describe('#extractUsefulHeaders', function () {
        it('should extract useful headers from the given headers', function () {
            expect(utils.extractUsefulHeaders(headersData)).to.deep.equal({
                link: '<https://api.github.com/repositories/321278/issues?page=11&per_page=25>; rel="next", ' +
                    '<https://api.github.com/repositories/321278/issues?page=75&per_page=25>; rel="last", ' +
                    '<https://api.github.com/repositories/321278/issues?page=1&per_page=25>; rel="first", ' +
                    '<https://api.github.com/repositories/321278/issues?page=9&per_page=25>; rel="prev"',
                status: '200 OK',
                'x-ratelimit-limit': '60',
                'x-ratelimit-remaining': '56',
                'x-ratelimit-reset': '1453886022'
            });
        });
    });

    describe('#getPaginationInfo', function () {
        it('should return pagination info extracted from Link Header', function () {
            expect(utils.getPaginationInfo(headersData.link)).to.deep.equal({
                first: '1',
                last: '75',
                prev: '9',
                next: '11'
            });
        });
    });
});