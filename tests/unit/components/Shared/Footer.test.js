/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import sinon from 'sinon';

describe('Footer', function () {
    let Footer;

    before(function () {
        Footer = require('../../../../components/Shared/Footer');
    });

    describe('#render', function () {
        let clock;

        before(function () {
            clock = sinon.useFakeTimers(1454212371676);
        });

        after(function () {
            clock.restore();
        });

        it('should render copyright text', function () {
            jsx.assertRender(Footer, null,
                '<footer+>' +
                    '<span+>Copyright ©2016, Sumit Rai</span>' +
                '</footer>'
            );
        });
    });
});
