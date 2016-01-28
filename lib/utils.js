/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import marked from 'marked';
import urlLib from 'url';

const USER_LOGIN_REGEX = /@([a-zA-Z]\w+)/g;
const USEFUL_HEADERS = ['status', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'link'];

export default {
    /**
     * Returns the page numbers visible given current page number
     * @param {Number} currentPageNumber current page number
     * @param {Number} lastPage last page number
     * @param {Number} pagesToShow total pages to show
     * @return {Array} the page numbers which should be visible
     */
    getPageNumbers: (currentPageNumber, lastPage, pagesToShow) => {
        let pages = [];
        let pageNumber;
        let j;
        let minIndex;
        let maxIndex;

        const pagesToAdd = Math.floor(pagesToShow / 2);

        minIndex = Math.max(1, currentPageNumber - pagesToAdd);

        maxIndex = Math.min(lastPage, currentPageNumber + pagesToAdd);

        if (maxIndex - currentPageNumber < pagesToAdd) {
            // page towards right

            minIndex -= pagesToAdd - (maxIndex - currentPageNumber);
            minIndex = Math.max(1, minIndex);
        } else if (minIndex + pagesToAdd > currentPageNumber) {
            // page towards left

            maxIndex += (minIndex + pagesToAdd) - currentPageNumber;
            maxIndex = Math.min(lastPage, maxIndex);
        }

        // Remove extra page for even number of pages
        if (maxIndex - minIndex >= pagesToShow) {
            if (maxIndex === lastPage) {
                minIndex++;
            } else {
                maxIndex--;
            }
        }

        // Now create the array and return
        for(j = 0, pageNumber = minIndex; pageNumber <= maxIndex; pageNumber++) {
            pages[j++] = pageNumber;
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
    },

    /**
     * Get the pagination information from the linkHeader
     * @param {String} linkHeader Link Header Content
     * @return {Object} the pagination info object
     */
    getPaginationInfo: (linkHeader) => {
        let finalObj = {};
        let differentLinks = linkHeader.split(',');
        differentLinks.forEach((linkString) => {
            let part = linkString.split(';');
            let linkObj = urlLib.parse(part[0].slice(1, -1));    // get the url part
            const pageValue = linkObj.query.match('page=([0-9]+)')[1];
            const indexValue = part[1].slice(part[1].indexOf('="') + 2, -1);

            finalObj[indexValue] = pageValue;
        });

        return finalObj;
    }
};
