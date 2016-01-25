/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';
import Labels from '../Shared/Labels';
import IssueState from '../Shared/IssueState';
import IssueDate from '../Shared/IssueDate';
import { FormattedMessage, injectIntl } from 'react-intl';

import { getMiniSummary, getParsedMarkupContent } from '../../lib/utils';

class IssueListItem extends React.Component {
    render() {
        const { issue, routeParams } = this.props;

        const owner = routeParams.get('owner');
        const repo = routeParams.get('repo');
        const title = this.props.intl.formatMessage({ id: 'GOTO_ISSUE' }, { issue: issue.number});

        return (
            <div className="issue-info ShadowBox">
                <div className="top Mb-10px">
                    <NavLink
                        className="titleLink Fz-m bold"
                        routeName="issue"
                        navParams={{
                            owner: owner,
                            repo: repo,
                            issueNumber: issue.number
                        }}
                        title={title}
                    >
                        {issue.title}
                    </NavLink>
                    <NavLink
                        className="Mstart-10px link C-Gray"
                        routeName="issue"
                        navParams={{
                            owner: owner,
                            repo: repo,
                            issueNumber: issue.number
                        }}
                        title={title}
                    >
                        <FormattedMessage id="ISSUE_NUMBER" values={{ issue: issue.number }} />
                    </NavLink>
                    <IssueState state={issue.state} className="Fl-end"/>
                </div>
                <p className="summary Ov-h Lh-20px" dangerouslySetInnerHTML={getParsedMarkupContent(getMiniSummary(issue.body))} />
                <div className="Mt-10px">
                    <Labels labels={issue.labels}/>
                    <span className="Fl-end Fz-s C-Gray">
                        <FormattedMessage id="COMMENTS" values={{ number: String(issue.comments) }} />&nbsp;&bull;&nbsp;
                        <IssueDate className="Fl-end Fz-s C-Gray" dateType="list" date={issue.created_at}/>
                    </span>
                </div>
            </div>
        );
    }
}

IssueListItem.propTypes = {
    issue: React.PropTypes.object.isRequired,
    routeParams: React.PropTypes.object.isRequired
};

IssueListItem.defaultProps = {
    issue: {}
};

export default injectIntl(IssueListItem);
