/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';
import UserTile from '../Shared/UserTile';
import Labels from '../Shared/Labels';
import ItemLayout from '../Shared/ItemLayout';
import IssueState from '../Shared/IssueState';

function getSummary(summary) {
    let smallSummary;
    if (summary.length > 140) {
        smallSummary = summary.substring(0, 140);
    } else {
        smallSummary = summary;
    }

    return smallSummary;
}

class IssueListItem extends React.Component {
    render() {
        const { issue } = this.props;

        const title = 'Go to Issue ' + issue.number;
        const createdTimeText = 'Opened on ' + issue.created_at;

        return (
            <div className="issue-info ShadowBox">
                <div className="top">
                    <NavLink
                        className="title"
                        routeName="issue"
                        navParams={{ issueNumber: issue.number }}
                        title={title}
                    >
                        {issue.title}
                    </NavLink>
                    <NavLink
                        className="number"
                        routeName="issue"
                        navParams={{ issueNumber: issue.number }}
                        title={title}
                    >
                        {'#' + issue.number}
                    </NavLink>
                    <IssueState state={issue.state} />
                </div>
                <p className="summary">{getSummary(issue.body)}</p>
                <div className="bottom">
                    <Labels labels={issue.labels}/>
                    <span className="create-date">{createdTimeText}</span>
                </div>
            </div>
        );
    }
}

IssueListItem.propTypes = {
    issue: React.PropTypes.object.isRequired
};

IssueListItem.defaultProps = {
    issue: {}
};

export default IssueListItem;
