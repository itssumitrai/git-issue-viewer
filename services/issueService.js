/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import request from 'request';
import { apiHost } from '../configs/app';
import { extractUsefulHeaders } from '../lib/utils';

export default {
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
                const usefulHeaders = extractUsefulHeaders(response.headers);

                if (error) {
                    // If error occured
                    return callback(error, {
                        headers: usefulHeaders,
                        body: body
                    });
                }

                if (!error && response.statusCode !== 200) {
                    // This is a not ok response, send down an error in this case

                    const message = 'HTTP Status ' + response.statusCode + ' received ' +
                        'Expected: 200. ' + body.toString().substr(0, 30) + '..';

                    return callback(new Error(message), {
                        headers: usefulHeaders,
                        body: body
                    });
                }

                // Everything's fine, send the response
                return callback(null, {
                    headers: usefulHeaders,
                    body: JSON.parse(body)
                });
            });
        }

        // required params not found
        callback(new Error('IssueService: params must have owner and repo'), null);
    }
};
