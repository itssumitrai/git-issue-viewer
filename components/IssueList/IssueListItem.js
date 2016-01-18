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
import Date from '../Shared/Date';

import { getMiniSummary } from '../../lib/utils';

class IssueListItem extends React.Component {
    render() {
        const { issue } = this.props;

        const title = 'Go to Issue ' + issue.number;

        return (
            <div className="issue-info ShadowBox">
                <div className="top Mb-10px">
                    <NavLink
                        className="title Fz-m bold"
                        routeName="issue"
                        navParams={{ issueNumber: issue.number }}
                        title={title}
                    >
                        {issue.title}
                    </NavLink>
                    <NavLink
                        className="Mstart-10px link C-Gray"
                        routeName="issue"
                        navParams={{ issueNumber: issue.number }}
                        title={title}
                    >
                        {'#' + issue.number}
                    </NavLink>
                    <IssueState state={issue.state} className="Fl-end"/>
                </div>
                <p className="Ov-h">{getMiniSummary(issue.body)}</p>
                <div className="Mt-10px">
                    <Labels labels={issue.labels}/>
                    <Date className="Fl-end Fz-s C-Gray" type="create" date={issue.created_at}/>
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
