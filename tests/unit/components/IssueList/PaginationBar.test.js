/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';
import mockery from 'mockery';
import Immutable from 'immutable';
import { getPageNumbers } from '../../../../lib/utils';
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
                    last: '50'
                }
            };
        });

        it('should render Previous page link', function () {
            jsx.assertRender(PaginationBar, props,
                '<li+><a*href="/npm/npm/4"><span>Previous</span></a></li>'
            );
        });

        it('should render Next page Link', function () {
            jsx.assertRender(PaginationBar, props,
                '<li+><a href="/npm/npm/6"+><span>Next</span></a></li>'
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