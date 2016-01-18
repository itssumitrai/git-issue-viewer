/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class IssueState extends React.Component {
    render() {
        const stateText = this.props.state;
        const className = 'state Bdrs Fw-b ' + this.props.className + ' ' + this.props.state;
        return (
            <span className={className}>{stateText}</span>
        );
    }
}

IssueState.propTypes = {
    className: React.PropTypes.string,
    state: React.PropTypes.string.isRequired
};

export default IssueState;
