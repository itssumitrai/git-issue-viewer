/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';

describe('Labels', function () {
    let Labels;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('./Label', jsx.stubComponent('Label', null, true));
        Labels = require('../../../../components/Shared/Labels');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                labels: [{
                    key: 1,
                    name: 'bug',
                    url: 'https://api.github.com/repos/npm/npm/labels/bug',
                    color: 'C40233'
                }, {
                    key: 2,
                    name: 'support',
                    url: 'https://api.github.com/repos/npm/npm/labels/support',
                    color: 'FF91AF'
                }]
            };
        });

        it('should render list of Labels', function () {
            jsx.assertRender(Labels, props,
                '<ul+><Label label*></Label><Label label*></Label></ul>'
            );
        });
    });
});
