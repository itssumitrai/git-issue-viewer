/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';
import Immutable from 'immutable';
import reactIntlMock from '../../../mocks/reactIntlMock';
import fluxibleRouterMock from '../../../mocks/fluxibleRouterMock';

describe('PaginationBar', function () {
    let PaginationBar;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('fluxible-router', fluxibleRouterMock);
        PaginationBar = require('../../../../components/IssueList/PaginationBar');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                routeParams: Immutable.fromJS({
                    owner: 'npm',
                    repo: 'npm'
                }),
                pageNumber: '5',
                totalPages: 20,
                pagesToShow: 15,
                paginationInfo: {
                    next: '6',
                    last: '50',
                    prev: '4',
                    first: '1'
                }
            };
        });

        it('should render Previous page link', function () {
            jsx.assertRender(PaginationBar, props,
                '<li+><a*href="/npm/npm/4"><span>Previous</span></a></li>'
            );
        });

        it('should render Previous page link as disabled if we are on first page', function () {
            props.paginationInfo.next = '2';
            props.paginationInfo.prev = undefined;
            props.pageNumber = '1';

            jsx.assertRender(PaginationBar, props,
                '<li+>*<span>Previous</span>*</li>'
            );
        });

        it('should render Next page Link', function () {
            jsx.assertRender(PaginationBar, props,
                '<li+><a href="/npm/npm/6"+><span>Next</span></a></li>'
            );
        });

        it('should render Next page link as disabled if we are on last page', function () {
            props.paginationInfo.next = undefined;
            props.paginationInfo.prev = '49';
            props.paginationInfo.last = undefined;
            props.pageNumber = '50';

            jsx.assertRender(PaginationBar, props,
                '<li+>*<span>Next</span>*</li>'
            );
        });

        it('should render page numbers as links in desired format', function () {
            jsx.assertRender(PaginationBar, props,
                '<li+><a href="/npm/npm/1"+>1</a></li><li+><a href="/npm/npm/2"+>2</a></li>' +
                '<li+><a href="/npm/npm/3"+>3</a></li><li+><a href="/npm/npm/4"+>4</a></li>' +
                '<li+><span+>5</span></li><li+><a href="/npm/npm/6"+>6</a></li>' +
                '<li+><a href="/npm/npm/7"+>7</a></li><li+><a href="/npm/npm/8"+>8</a></li>' +
                '<li+><a href="/npm/npm/9"+>9</a></li><li+><a href="/npm/npm/10"+>10</a></li>' +
                '<li+><a href="/npm/npm/11"+>11</a></li><li+><a href="/npm/npm/12"+>12</a></li>' +
                '<li+><a href="/npm/npm/13"+>13</a></li><li+><a href="/npm/npm/14"+>14</a></li>' +
                '<li+><a href="/npm/npm/15"+>15</a></li>'
            );
        });
    });
});
