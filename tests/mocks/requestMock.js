/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import issueListResponse from '../data/issueListServiceResponse.json';
import issueListPaginationResponse from '../data/issueListServicePaginationResponse.json';
import issueDetailCommentsResponse from '../data/issueDetailCommentsResponse.json';
import issueDetailServiceResponse from '../data/issueDetailServiceResponse.json';
import issueServiceErrorResponse from '../data/issueServiceErrorResponse.json';
import headersData from '../data/headersData.json';

export default {
    get: (options, callback) => {
        const { url, qs } = options;
        let error = 'Incorrect Request';
        let response = {
            statusCode: 400,
            headers: headersData
        };
        let body = JSON.stringify({ message: 'Something definitely wrong' });

        if (url === 'https://api.github.com/repos/npm/npm/issues') {
            if (qs && qs.page === '2' && qs.per_page === '5') {
                error = null;
                response.statusCode = 200;
                body = JSON.stringify(issueListPaginationResponse);
            } else if (!qs) {
                error = null;
                response.statusCode = 200;
                body = JSON.stringify(issueListResponse);
            }
        } else if (url === 'https://api.github.com/repos/yahoo/fluxible/issues') {
            error = null;
            response.statusCode = 200;
            body = '[]';
        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11217') {
            error = null;
            response.statusCode = 200;
            body = JSON.stringify(issueDetailServiceResponse);

        } else if(url === 'https://api.github.com/repos/npm/npm/issues/11217/comments') {
            error = null;
            response.statusCode = 200;
            body = JSON.stringify(issueDetailCommentsResponse);
        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11218') {
            // error http response
            error = new Error('Boom!');
            response.statusCode = 400;
            body = JSON.stringify({ message: 'Some Error Occured' });

        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11219') {
            // not ok http response
            error = null;
            response.statusCode = 403;
            body = JSON.stringify(issueServiceErrorResponse);
        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11220') {
            // no body response
            error = null;
            response.statusCode = 200;
            body = null;
        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11221') {
            // empty array body response
            error = null;
            response.statusCode = 200;
            body = '[]';
        } else if (url === 'https://api.github.com/repos/npm/npm/issues/11222') {
            // not ok http response with no message
            error = null;
            response.statusCode = 403;
            body = JSON.stringify({});

        }

        callback(error, response, body);
    }
};
