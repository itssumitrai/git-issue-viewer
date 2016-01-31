/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import strings from '../../../../lang/strings.json';
import Waypoint from 'react-waypoint';

describe('ScrollUp', function () {
    let ScrollUp;

    before(function () {
        ScrollUp = require('../../../../components/Shared/ScrollUp');
    });

    describe('#render', function () {
        let component;
        before(function () {
            component = ReactTestUtils.renderIntoDocument(
                React.createElement(IntlProvider, { locale: 'en', messages: strings },
                    React.createElement(ScrollUp)
                )
            );

            let injectIntlScrollUp = ReactTestUtils.findRenderedComponentWithType(component, ScrollUp);
            component = injectIntlScrollUp.refs.wrappedElement;
        });

        it('should render Waypoint component', function () {
            let waypoint = ReactTestUtils.findRenderedComponentWithType(component, Waypoint);
            expect(waypoint.props.onEnter).to.be.a.function;
            expect(waypoint.props.onLeave).to.be.a.function;
            expect(waypoint.props.threshold).to.equal(2.0);

            // do a waypoint enter
            // We can't really fire manual events to fire off waypoint enter and leave, also we check our component
            // in isolation, assuming waypoint works and it will fire the handler when it needs to

            component.handleWaypointEnter();
            expect(component.state.visible).to.be.true;

            // Now do a waypoint leave
            component.handleWaypointLeave();
            expect(component.state.visible).to.be.false;
        });

        it('should render button if state is visible', function () {
            component.setState({
                visible: true
            }, () => {
                const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');

                let buttonNode = ReactDOM.findDOMNode(button);

                expect(buttonNode.getAttribute('title')).to.equal('Scroll to the Top');

                // Now do the mouse click
                ReactTestUtils.Simulate.click(
                    buttonNode,
                    {}
                );

                expect(component.state.visible).to.be.false;
            });
        });
    });
});
