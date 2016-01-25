/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';

describe('ItemLayout', function () {
    let ItemLayout;

    before(function () {
        ItemLayout = require('../../../../components/Shared/ItemLayout');
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                left: 'LeftComponent',
                right: 'RightComponent'
            };
        });

        it('should render given components correctly', function () {
            jsx.assertRender(ItemLayout, props,
                '<div class="item"><div+>LeftComponent</div><div+>RightComponent</div></div>'
            );
        });
    });
});