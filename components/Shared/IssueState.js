/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class IssueState extends React.Component {
    render() {
        const { props } = this;
        const octiconClass = props.state === 'closed' ? 'octicon-issue-closed' : 'octicon-issue-opened';

        const className = 'state Bdrs Fw-b ' + props.className + ' ' + props.state;
        return (
            <span className={className}>
                <span className={'octicon ' + octiconClass}/>&nbsp;
                {props.state}
            </span>
        );
    }
}

IssueState.propTypes = {
    className: React.PropTypes.string,
    state: React.PropTypes.string.isRequired
};

export default IssueState;
