/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';
import mockery from 'mockery';
import issue from '../../../data/issueDetailServiceResponse.json'

describe('Comment', function () {
    let Comment;
    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('../Shared/IssueDate', jsx.stubComponent('IssueDate', null, true));
        Comment = require('../../../../components/IssueDetail/Comment');
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

        it('should render comment date', function () {
            jsx.assertRender(Comment, props,
                '<IssueDate *data-datetype="comment" data-date="2016-01-20T10:50:02Z"></IssueDate>'
            );
        });

        it('should render comment content', function () {
            jsx.assertRender(Comment, props,
                '<div class="content"><p+>'
            );
        });

        it('should render owner label if user is site_admin', function () {
            props.issue.user.site_admin = true;
            jsx.assertRender(Comment, props,
                '<span class="labelBox+>Owner</span>'
            );
        });

        it('should not render owner label, if user is not a site_admin', function () {
            props.issue.user.site_admin = false;
            jsx.assertRender(Comment, props,
                '<span class="labelBox+></span>'
            );
        });
    });
});