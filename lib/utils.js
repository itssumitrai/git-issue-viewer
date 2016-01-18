/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

export default {
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
            markup = markup.replace(/```\w+([^`]+)```/g,
                '<div class="large-codeBox"><pre>$1</pre></div>'
            );

            // Replace all code occurences
            markup = markup.replace(/`([^`]+)`/g,
                '<span class="codeBox">$1</span>'
            );
        }

        if (!skipRules.user) {
            // Now Replace all userid occurences
            markup = markup.replace(/@(\w+)/g,
                '<a href="https://github.com/$1" class="link Fw-b C-LinkBlue">@$1</a>'
            );
        }

        return { __html: markup };
    }
};