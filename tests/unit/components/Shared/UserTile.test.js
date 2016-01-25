/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';
import { user } from '../../../data/issueDetailServiceResponse.json'

describe('UserTile', function () {
    let UserTile;
    before(function () {
        UserTile = require('../../../../components/Shared/UserTile');
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                user: user
            };
        });

        it('should render user gravar', function () {
            jsx.assertRender(UserTile, props,
                '<a href="https://github.com/bsdfzzzy">' +
                    '<img src="https://avatars.githubusercontent.com/u/11622770?v=3" *alt="bsdfzzzy"/>' +
                '</a>'
            );
        });

        it('should render user login id', function () {
            jsx.assertRender(UserTile, props,
                '<a href="https://github.com/bsdfzzzy"+>bsdfzzzy</a>'
            );
        });
    });
});