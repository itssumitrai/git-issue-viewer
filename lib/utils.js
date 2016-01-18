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
            smallSummary = summary.substring(0, maxCharLength);
        } else {
            smallSummary = summary;
        }

        return smallSummary;
    }
};