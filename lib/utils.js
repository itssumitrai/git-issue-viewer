/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import marked from 'marked';

const USER_LOGIN_REGEX = /@([a-zA-Z]\w+)/g;
const USEFUL_HEADERS = ['status', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'link'];

export default {
    /**
     * Returns the page indices visible given current page number
     * @param {Number} pageNumber current page number
     * @param {Number} pagesToShow total pages to show
     * @return {Array}  the page indices which should be visible
     */
    getPageNumbers: (pageNumber, pagesToShow) => {
        let pages = [];
        const pagesToAdd = Math.floor(pagesToShow / 2);
        let minIndex = Math.max(pageNumber - pagesToAdd, 1);
        for(let j = 0; j < pagesToShow; minIndex++) {
            pages[j++] = minIndex;
        }

        return pages;
    },

    /**
     * Given a summary, returns a smaller summary of max chars provided
     * @param {String} summary string summary
     * @param {Number} [maxCharLength=140] max number of chars allowed
     * @return {String} smaller summary of maxCharLength chars
     */
    getMiniSummary: (summary, maxCharLength) => {
        let smallSummary;
        if(typeof maxCharLength === 'undefined') {
            maxCharLength = 140;
        }

        if (summary.length > maxCharLength) {
            smallSummary = summary.substring(0, maxCharLength);
            // Now remove the unclean characters

            smallSummary = smallSummary.substring(0, smallSummary.lastIndexOf(' ')) + ' ...';
        } else {
            smallSummary = summary;
        }

        return smallSummary;
    },

    /**
     * Given a content, returns a parsed HTML content with tags associated
     * @param {String} content string summary
     * @param {Boolean} parseLogin whether login should be parsed or not
     * @return {Object} markup rich content
     */
    getParsedMarkupContent: (content, parseLogin) => {
        let markup = marked(content);

        // Now Replace all userid occurences
        if (parseLogin) {
            markup = markup.replace(USER_LOGIN_REGEX,
                '<a href="https://github.com/$1" class="link Fw-b C-LinkBlue">@$1</a>'
            );
        }

        return { __html: markup };
    },
    /**
     * A simple function to get timestamp from timestring
     * @param {String} timeString
     * @return {Number} timestamp
     */
    getTimestamp: (timeString) => {
        return new Date(timeString).getTime();
    },

    /**
     * Extracts only the useful headers
     * @param {Object} headers object with various headers as keys
     * @return {Object} only the extracted headers
     */
    extractUsefulHeaders: (headers) => {
        let finalObj = {};
        Object.keys(headers).forEach((header) => {
            if (USEFUL_HEADERS.indexOf(header) !== -1) {
                // this is a useful header, save it!
                finalObj[header] = headers[header];
            }
        });

        return finalObj;
    }
};
