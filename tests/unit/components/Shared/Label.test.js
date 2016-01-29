/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';

describe('Label', function () {
    let Label;
    
    before(function () {
        Label = require('../../../../components/Shared/Label');
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                label: {
                    key: 1,
                    name: 'bug',
                    url: 'https://api.github.com/repos/npm/npm/labels/bug',
                    color: 'C40233'
                }
            };
        });

        it('should render label link and label name correctly', function () {
            jsx.assertRender(Label, props,
                '<li title="bug" *style="background-color:#C40233;">' +
                    '<a href="https://github.com/npm/npm/labels/bug" target="_blank">bug</a></li>'
            );
        });
    });
});