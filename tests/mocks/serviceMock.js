/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

export default {
    read: (resource, params, context, callback) => {
        if (resource === 'issueService') {
            if (params.owner === 'fail') {
                return callback('Boom!', null);
            }

            if (params.issueNumber) {
                if (params.isComment) {
                    if (params.issueNumber === 22222) {
                        return callback('Boom!', null);
                    }

                    return callback(null, [{
                        title: 'this is comment 1'
                    }, {
                        title: 'this is comment 2'
                    }]);
                }

                if (params.issueNumber === 11111) {
                    return callback('Boom!', null);
                }

                return callback(null, {
                    id: '1',
                    title: 'This is some issue',
                    number: params.issueNumber
                });
            }

            callback(null, [{
                id: '1',
                title: 'This is some issue',
                number: 12345
            }, {
                id: '2',
                title: 'This is another issue',
                number: 12346
            }]);
        }
    }
};