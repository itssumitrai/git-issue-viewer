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

                if (error || response.statusCode !== 200 || !body) {
                    // This is a not ok response Some error occured

                    const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
                    let errorMessage = 'Internal Server Error. HTTP Status ' + statusCode + ' received';

                    if (body) {
                        const parsedBody = JSON.parse(body);
                        errorMessage = parsedBody.message || errorMessage;
                    }

                    let errorObj = error || {
                            statusCode: statusCode,
                            headers: usefulHeaders,
                            message: errorMessage
                        };

                    return callback(errorObj, null);
                }

                const responseBody = JSON.parse(body);
                if (Array.isArray(responseBody) && responseBody.length === 0 && !params.issueNumber) {
                    // Empty Array for issue List call here means data not found, send down 404

                    return callback({
                        statusCode: 404,
                        message: 'Not Found',
                        headers: usefulHeaders
                    }, null);
                }

                // Everything's fine, send the response
                return callback(null, {
                    headers: usefulHeaders,
                    body: responseBody
                });
            });
        }

        // required params not found
        return callback({
            statusCode: 500,
            message: 'Required Params for rest call must have `owner` and `repo`'
        }, null);
    }
};
