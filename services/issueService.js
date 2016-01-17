/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

let issueService = {
    name: 'issueService',

    read: function(req, resource, params, config, callback) {
        setTimeout(function () {
            callback(null, JSON.parse(JSON.stringify(_messages)));
        }, 10);
    }
};

export default issueService;