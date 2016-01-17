/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import IssueListStore from '../stores/IssueListStore';
import { connectToStores } from 'fluxible-addons-react';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1
        };
    }

    renderIssue(issue) {
        return (
            <li key={issue.id}>{issue.title}</li>
        );
    }

    render() {
        let issueListItems = this.props.issues && this.props.issues.map(this.renderIssue);

        return (
            <div>
                <ul>
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
