/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

const MULTI_CODEBLOCK_REGEX = /```(javascript|json|java|python)?([^`]+)```/g;
const CODEBLOCK_REGEX = /`([^`]+)`/g;
const USER_LOGIN_REGEX = /@(\w+)/g;

export default {
    getPageNumbers: (pageNumber, pagesToShow) => {
        let pages = [];
        const pagesToAdd = Math.floor(pagesToShow/2);
        let minIndex = Math.max(pageNumber - pagesToAdd, 1);
        let maxIndex = pageNumber + pagesToAdd;
        for(let i = minIndex,j = 0; i <= maxIndex; i++) {
            pages[j++] = i;
        }

        return pages;
    },

    /**
     * Given a summary, returns a smaller summary of max chars provided
     * @param {string} summary string summary
     * @param {number} [maxCharLength=140] max number of chars allowed
     * @return {string} smaller summary of maxCharLength chars
     */
    getMiniSummary: (summary, maxCharLength) => {
        let smallSummary;
        if(typeof maxCharLength === 'undefined') {
            maxCharLength = 140;
        }

        if (summary.length > maxCharLength) {
            smallSummary = summary.substring(0, maxCharLength) + '...';
        } else {
            smallSummary = summary;
        }

        return smallSummary;
    },

    /**
     * Given a content, returns a parsed HTML content with tags associated
     * @param {string} content string summary
     * @param {object} skipRules object to skip replacement rules
     * @return {object} markup rich content
     */
    getParsedMarkupContent: (content, skipRules) => {
        let markup = content;
        skipRules = skipRules || {};

        if (!skipRules.code) {
            // Replace all big codebox occurences
            markup = markup.replace(MULTI_CODEBLOCK_REGEX,
                '<div class="large-codeBox"><pre>$2</pre></div>'
            );

            // Replace all code occurences
            markup = markup.replace(CODEBLOCK_REGEX,
                '<span class="codeBox">$1</span>'
            );
        }

        if (!skipRules.user) {
            // Now Replace all userid occurences
            markup = markup.replace(USER_LOGIN_REGEX,
                '<a href="https://github.com/$1" class="link Fw-b C-LinkBlue">@$1</a>'
            );
        }

        return { __html: markup };
    }
};