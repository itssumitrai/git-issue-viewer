/* globals expect, before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';

describe('IssueState', function () {
    let IssueState;

    before(function () {
        IssueState = require('../../../../components/Shared/IssueState');
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                state: 'open'
            };
        });

        it('should render state of the issue when `state=open`', function () {
            jsx.assertRender(IssueState, props,
                '<span class="state*open"><span class="octicon octicon-issue-opened">*<span>open</span></span>'
            );
        });

        it('should render state of the issue when `state=closed`', function () {
            props.state = 'closed';
            jsx.assertRender(IssueState, props,
                '<span class="state*closed"><span class="octicon octicon-issue-closed">*<span>closed</span></span>'
            );
        });
    });
});
