/* globals before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';
import jsx from 'jsx-test';
import mockery from 'mockery';
// import ReactTestUtils from 'react-addons-test-utils';
// import { jsdom } from 'jsdom';
import reactIntlMock from '../../../mocks/reactIntlMock';

describe('ScrollUp', function () {
    let ScrollUp;

    before(function () {
        /*global.document = jsdom('<html><body></body></html>', {});
        global.window = global.document.defaultView;
        global.navigator = {
            userAgent: 'node.js'
        };*/

        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('react-intl', reactIntlMock);
        mockery.registerMock('react-waypoint', jsx.stubComponent('Waypoint', null, true));
        ScrollUp = require('../../../../components/Shared/ScrollUp');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();

        /*delete global.document;
        delete global.window;
        delete global.navigator;*/
    });

    describe('#render', function () {
        it('should render Waypoint', function () {
            jsx.assertRender(ScrollUp, null, '<Waypoint+></Waypoint>');
        });

        // TODO: fix this test later
        /*it('should render button if state is visible', function () {
            const component = jsx.renderComponent(ScrollUp, null);

            component.setState({
                visible: true
            });

            console.log('>>>component:', component.getDOMNode().innerHTML);
            const button = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            expect(button).to.have.length(1);
        });*/
    });
});