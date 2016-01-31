/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { createMockComponentContext } from 'fluxible/utils';
import strings from '../../../../lang/strings.json';
import RepoSelector from '../../../../components/Shared/RepoSelector';
import { Component as OriginalComponent } from '../../../../components/Shared/RepoSelector';
import { NavLink } from 'fluxible-router';
import sinon from 'sinon';

describe('RepoSelector', function () {
    let shallowRenderer;

    before(function () {
        shallowRenderer = ReactTestUtils.createRenderer();
    });

    describe('#render', function () {
        let props;
        let component;
        let context;

        beforeEach(function () {
            context = createMockComponentContext();
            context.executeAction = sinon.spy();

            props = {
                owner: 'npm',
                repo: 'npm',
                headingLink: false,
                context: context
            };

            component = ReactTestUtils.renderIntoDocument(
                <IntlProvider locale="en" messages={strings}>
                    <RepoSelector {...props} />
                </IntlProvider>
            );

            let injectIntlRepoSelector = ReactTestUtils.findRenderedComponentWithType(component, RepoSelector);
            component = injectIntlRepoSelector.refs.wrappedElement;
            component.context = context;
        });

        it('should render initial clickable form and show editable form on click', function () {
            expect(component.state.editable).to.be.false;

            let formContainer = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'form-container');
            let buttonNode = ReactDOM.findDOMNode(formContainer).querySelector('button');

            expect(buttonNode.getAttribute('title')).to.equal('Click to Change');
            expect(buttonNode.children[0].tagName).to.equal('SPAN');
            expect(buttonNode.children[1].tagName).to.equal('SPAN');

            // Now do the mouse click
            ReactTestUtils.Simulate.click(
                buttonNode,
                {}
            );

            expect(component.state.editable).to.be.true;

            let inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
            expect(inputs).to.have.length(2);
            expect(inputs[0].getAttribute('type')).to.equal('text');
            expect(inputs[0].getAttribute('placeholder')).to.equal('npm');
            expect(inputs[1].getAttribute('type')).to.equal('text');
            expect(inputs[1].getAttribute('placeholder')).to.equal('npm');

            let buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            expect(buttons).to.have.length(1);
            expect(buttons[0].getAttribute('type')).to.equal('submit');
            expect(buttons[0].innerHTML).to.contain('Cancel');
        });

        it('should show `Show All issues` button when something is input in the textbox', function () {
            expect(component.state.editable).to.be.false;

            let formContainer = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'form-container');
            let buttonNode = ReactDOM.findDOMNode(formContainer).querySelector('button');

            // Now do the mouse click
            ReactTestUtils.Simulate.click(
                buttonNode,
                {}
            );

            // Now editable form open up, enter something
            let inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');

            // change values for textboxes
            inputs[0].value = 'yahoo';
            inputs[1].value = 'fluxible';

            // Now do the change event
            ReactTestUtils.Simulate.change(
                inputs[0],
                {}
            );

            expect(component.state.textChanged).to.be.true;

            let buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            expect(buttons).to.have.length(2);
            expect(buttons[0].getAttribute('type')).to.equal('submit');
            expect(buttons[0].innerHTML).to.contain('Show all Issues');
            expect(buttons[1].innerHTML).to.contain('Cancel');

            // Now do a click on submit button
            ReactTestUtils.Simulate.click(
                buttons[0],
                {}
            );

            expect(props.context.executeAction.callCount).to.equal(1);
            expect(props.context.executeAction.getCall(0).args[1]).to.deep.equal({
                routeName: 'issueList',
                params: {
                    owner: 'yahoo',
                    repo: 'fluxible',
                    page: '1'
                }
            });

            // change values for textboxes
            inputs[0].value = '';
            inputs[1].value = '';
            inputs[0].placeholder = 'npm';
            inputs[1].placeholder = 'npm';

            // Now do a submit with Enter
            ReactTestUtils.Simulate.keyPress(inputs[0], {
                key: 'Enter',
                keyCode: 13,
                charCode: 13,
                which: 13
            });

            expect(props.context.executeAction.callCount).to.equal(2);
            expect(props.context.executeAction.getCall(1).args[1]).to.deep.equal({
                routeName: 'issueList',
                params: {
                    owner: 'npm',
                    repo: 'npm',
                    page: '1'
                }
            });

            // Now do a key press with something else
            ReactTestUtils.Simulate.keyPress(inputs[0], {
                key: 'Shift',
                keyCode: 20,
                charCode: 20,
                which: 20
            });

            expect(props.context.executeAction.callCount).to.equal(2);
        });

        it('should render the heading', function () {
            props.intl = {
                formatMessage: function (str) {
                    return strings[str];
                }
            };

            shallowRenderer.render(React.createElement(OriginalComponent, props));
            let result = shallowRenderer.getRenderOutput();
            expect(result.type).to.deep.equal('section');
            let heading = result.props.children[1];
            expect(heading.type).to.equal('h2');
            expect(heading.props.children.type).to.deep.equal(FormattedMessage);
            expect(heading.props.children.props).to.deep.equal({
                id: 'ALL_ISSUES',
                values: { owner: 'npm', repo: 'npm' },
                tagName: 'span'
            });
        });

        it('should render heading as link if `headlingLink=true`', function () {
            props.intl = {
                formatMessage: function (str) {
                    return strings[str];
                }
            };
            props.headingLink = true;

            shallowRenderer.render(React.createElement(OriginalComponent, props));
            let result = shallowRenderer.getRenderOutput();
            expect(result.type).to.deep.equal('section');
            let headingContainer = result.props.children[1];
            expect(headingContainer.type).to.equal('div');
            expect(headingContainer.props.children).to.have.length(2);
            let heading = headingContainer.props.children[0];

            expect(heading.type).to.equal('h2');
            expect(heading.props.children.type).to.deep.equal(FormattedMessage);
            expect(heading.props.children.props).to.deep.equal({
                id: 'ALL_ISSUES',
                values: { owner: 'npm', repo: 'npm' },
                tagName: 'span'
            });
            let navlink = headingContainer.props.children[1];
            expect(navlink.type).to.equal(NavLink);
            expect(navlink.props.routeName).to.equal('issueList');
            expect(navlink.props.navParams).to.deep.equal({
                owner: 'npm',
                repo: 'npm',
                page: '1'
            });
            expect(navlink.props.children.type).to.deep.equal(FormattedMessage);
            expect(navlink.props.children.props).to.deep.equal({
                id: 'ALL_ISSUES',
                values: { owner: 'npm', repo: 'npm' },
                tagName: 'span'
            });
        });
    });
});
