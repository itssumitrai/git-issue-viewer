/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import IssueState from '../Shared/IssueState';
import Labels from '../Shared/Labels';
import IssueDate from '../Shared/IssueDate';
import { getParsedMarkupContent } from '../../lib/utils';
import { FormattedMessage } from 'react-intl';

const ISSUE_NUMBER_PREFIX = '#';

class IssueDetailHeader extends React.Component {
    render() {
        const { issue } = this.props;

        return (
            <div className="Mb-20px">
                <h2 className="issue-detail-header Fw-n">
                    <span className="title D-ib" dangerouslySetInnerHTML={getParsedMarkupContent(issue.title)} />
                    <span className="Mstart-10px C-SGray">{ISSUE_NUMBER_PREFIX + issue.number}</span>
                </h2>
                <div className="Mb-10px C-Gray">
                    <IssueState state={issue.state} className="Mend-10px"/>
                    <a href={issue.user.html_url} className="link Fw-b C-Gray">
                        {issue.user.login}
                    </a>
                    &nbsp;<IssueDate className="C-Gray" dateType="create" date={issue.created_at}/>&nbsp;&bull;&nbsp;<FormattedMessage id="COMMENTS" values={{ number: String(issue.comments) }}/>
                </div>
                <Labels labels={issue.labels}/>
            </div>
        );
    }
}

IssueDetailHeader.propTypes = {
    issue: React.PropTypes.object.isRequired
};

export default IssueDetailHeader;
