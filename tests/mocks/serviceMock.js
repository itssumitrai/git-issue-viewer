/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

export default {
    read: (resource, params, context, callback) => {
        const headers = {
            status: '200 OK',
            'x-ratelimit-limit': '60',
            'x-ratelimit-remaining': '55',
            'x-ratelimit-reset': '1453886022',
            link: '<https://api.github.com/repositories/321278/issues?page=2&per_page=25>; rel="next", ' +
                '<https://api.github.com/repositories/321278/issues?page=75&per_page=25>; rel="last"'
        };

        if (resource === 'issueService') {
            if (params.owner === 'fail') {
                return callback('Boom!', {
                    headers: headers,
                    body: 'Some Error Response'
                });
            }

            if (params.issueNumber) {
                if (params.isComment) {
                    if (params.issueNumber === 22222) {
                        return callback('Boom!', {
                            headers: headers,
                            body: 'Some Error Response'
                        });
                    }

                    return callback(null, {
                        headers: headers,
                        body: [{
                            title: 'this is comment 1'
                        }, {
                            title: 'this is comment 2'
                        }]
                    });
                }

                if (params.issueNumber === 11111) {
                    return callback('Boom!', {
                        headers: headers,
                        body: 'Some Error Response'
                    });
                }

                return callback(null, {
                    headers: headers,
                    body: {
                        id: '1',
                        title: 'This is some issue',
                        number: params.issueNumber
                    }
                });
            }

            callback(null, {
                headers: headers,
                body: [{
                    id: '1',
                    title: 'This is some issue',
                    number: 12345
                }, {
                    id: '2',
                    title: 'This is another issue',
                    number: 12346
                }]
            });
        }
    }
};