/*global window*/
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import Waypoint from 'react-waypoint';
import { injectIntl } from 'react-intl';

class ScrollUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onClick = this.onClick.bind(this);
        this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
        this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
    }

    onClick(e) {
        e.stopPropagation();
        window.scrollTo(0, 0);
        this.setState({
            visible: false
        });
    }

    handleWaypointEnter() {
        this.setState({
            visible: true
        });
    }

    handleWaypointLeave() {
        this.setState({
            visible: false
        });
    }

    render() {
        let scrollButton;
        if (this.state.visible) {
            scrollButton = (
                <button onClick={this.onClick} className="scroll-up mega-octicon octicon-chevron-up" title={this.props.intl.formatMessage({ id: 'GOTO_TOP'})}>
                </button>
            );
        }

        return (
            <div className="scroll-up">
                {scrollButton}
                <Waypoint
                    onEnter={this.handleWaypointEnter}
                    onLeave={this.handleWaypointLeave}
                    threshold={2.0}
                />
            </div>
        );
    }
}

export default injectIntl(ScrollUp);
