/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';
import reactIntlMock from '../../../mocks/reactIntlMock';
import issue from '../../../data/issueDetailServiceResponse.json';

describe('IssueDetailHeader', function () {
    let IssueDetailHeader;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('../Shared/IssueState', jsx.stubComponent('IssueState', null, true));
        mockery.registerMock('../Shared/Labels', jsx.stubComponent('Labels', null, true));
        mockery.registerMock('../Shared/IssueDate', jsx.stubComponent('IssueDate', null, true));
        IssueDetailHeader = require('../../../../components/IssueDetail/IssueDetailHeader');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                issue: issue
            };
        });

        it('should render title and issueNumber', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<h2+><span class="title+>*Cannot find module'
            );
        });

        it('should render issue state', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<IssueState data-state="open"+></IssueState>'
            );
        });

        it('should render user profile url', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<a href="https://github.com/bsdfzzzy"+>bsdfzzzy</a>'
            );
        });

        it('should render the date', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<IssueDate *data-datetype="create" data-date="2016-01-20T10:50:02Z"></IssueDate>'
            );
        });

        it('should render number of comments', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<span>1 comments</span>'
            );
        });

        it('should render issue labels', function () {
            jsx.assertRender(IssueDetailHeader, props,
                '<Labels data-labels=""></Labels>'
            );
        });
    });
});
