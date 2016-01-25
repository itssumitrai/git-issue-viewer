/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';
import { expect } from 'chai';

import jsx from 'jsx-test';
import mockery from 'mockery';
import reactIntlMock from '../../../mocks/reactIntlMock';

describe('IssueDate', function () {
    let IssueDate;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        IssueDate = require('../../../../components/Shared/IssueDate');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                dateType: 'comment',
                date: '2016-01-20T10:50:02Z'
            };
        });

        it('should render date of `dateType=comment`', function () {
            props.dateType = 'comment';
            jsx.assertRender(IssueDate, props,
                '<span+><span>commented</span>*<span>1453287002000</span></span>'
            );
        });

        it('should render date of `dateType=list`', function () {
            props.dateType = 'list';
            jsx.assertRender(IssueDate, props,
                '<span+><span>issue opened</span>*<span>1453287002000</span></span>'
            );
        });

        it('should render date of `dateType=create`', function () {
            props.dateType = 'create';
            jsx.assertRender(IssueDate, props,
                '<span+><span>opened this issue</span>*<span>1453287002000</span></span>'
            );
        });

        it('should render date of `dateType=refer`', function () {
            props.dateType = 'refer';
            jsx.assertRender(IssueDate, props,
                '<span+><span>refer</span>*<span>1453287002000</span></span>'
            );
        });
    });
});