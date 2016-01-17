/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

// Components
import IssueListItem from '../components/IssueListItem';

// Stores
import IssueListStore from '../stores/IssueListStore';

// utils
import { connectToStores } from 'fluxible-addons-react';
import appConfig from '../configs/app';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: appConfig.initialGitOwner,
            repo: appConfig.initialGitRepo,
            pageNumber: appConfig.initialPageNumber
        };
    }

    renderIssue(issue) {
        return (
            <IssueListItem key={issue.id} issue={issue} />
        );
    }

    render() {
        let issueListItems = this.props.issues && this.props.issues.map(this.renderIssue);

        return (
            <div>
                <h2>All Issues from {this.state.owner}/{this.state.repo}</h2>
                <ul className="issue-list">
                    {issueListItems}
                </ul>
            </div>
        );
    }
}

IssueList.propTypes = {
    itemsPerPage: React.PropTypes.number
};

IssueList.defaultProps = {
    itemsPerPage: 25
};

IssueList = connectToStores(IssueList, [IssueListStore], (context, props) => {
    return {
        issues: context.getStore(IssueListStore).getIssues()
    }
});

export default IssueList;
