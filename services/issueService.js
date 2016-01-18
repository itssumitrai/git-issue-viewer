/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import request from 'request';
import { apiHost } from '../configs/app';

let issueService = {
    name: 'issueService',

    read: function(req, resource, params, config, callback) {
        // Make sure owner and repo are provided in the params
        if (params && params.owner && params.repo) {
            let apiUrl = apiHost + 'repos/' + params.owner + '/' + params.repo + '/issues';

            if (params.issueNumber) {
                // means its a request for a given issue

                apiUrl += '/' + params.issueNumber;
                if (params.isComment) {
                    // means its a request for comments

                    apiUrl += '/comments';
                }
            }

            let reqOptions = {
                method: 'GET',
                url: apiUrl,
                headers: {
                    'User-Agent': 'Git-Issue-Viewer'
                },
                qs: params.query  // pass down any querystring
            };

            return request.get(reqOptions, function (error, response, body) {
                if(!error && response.statusCode == 200) {
                    return callback(null, JSON.parse(body));
                }

                callback(error, null);
            });
        }

        // required params not found
        callback(new Error(500, 'IssueService: params must have owner and repo'), null);
    }
};

export default issueService;