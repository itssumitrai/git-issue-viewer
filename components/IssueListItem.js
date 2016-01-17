/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';

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
        const labels = issue.labels.map((label, index) => {
            return (
                <li key={index} className="label" style={{ backgroundColor: '#' + label.color }}>
                    {label.name}
                </li>
            )
        });
        const login = '@' + issue.user.login;
        const title = 'Go to Issue ' + issue.id;
        const createdTimeText = 'Opened on ' + issue.created_at;

        return (
            <li key={issue.id} className="item">
                <div className="user-info">
                    <img src={issue.user.avatar_url} className="gravatar" alt={login}/>
                    <div className="gravatar-info">
                        {login}
                    </div>
                </div>
                <div className="issue-info">
                    <div className="top">
                        <NavLink className="title" routeName="issue" navParams={{ issueNumber: issue.number }} title={title}>
                            {issue.title}
                        </NavLink>
                        <NavLink className="number" routeName="issue" navParams={{ issueNumber: issue.number }} title={title}>
                            {'#' + issue.number}
                        </NavLink>
                        <span className="state">{issue.state}</span>
                    </div>
                    <p className="summary">{getSummary(issue.body)}</p>
                    <div className="bottom">
                        <ul className="labels">
                            {labels}
                        </ul>
                        <span className="create-date">{createdTimeText}</span>
                    </div>
                </div>
            </li>
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
