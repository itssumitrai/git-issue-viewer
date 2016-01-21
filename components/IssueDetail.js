/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

// Components
import IssueDetailHeader from './IssueDetail/IssueDetailHeader';
import Comment from './IssueDetail/Comment';
import ItemLayout from './Shared/ItemLayout';
import UserTile from './Shared/UserTile';
import ScrollUp from './Shared/ScrollUp';

// Stores
import IssueStore from '../stores/IssueStore';

// utils
import { connectToStores } from 'fluxible-addons-react';

class IssueDetail extends React.Component {
    render() {
        const { issue, comments, error } = this.props;

        if (!issue && error) {
            return (
                <div class="error-message">{error}</div>
            );
        } else if (!issue) {
            return (
                <div className="spinner">
                    <div className="image"/>
                </div>
            );
        }

        const userElement = <UserTile user={issue.user} />;
        const commentElement = <Comment issue={issue} />;

        let commentList = [];
        commentList.push(
            <li key={issue.id}>
                <ItemLayout
                    key={issue.id}
                    left={userElement}
                    right={commentElement}
                />
            </li>
        );

        // Now iterate over comment Data and create the commentList
        comments.forEach((commentObj) => {
            const leftElement = <UserTile user={commentObj.user} />;
            const rightElement = <Comment issue={commentObj}/>;

            commentList.push(
                <li key={commentObj.id}>
                    <ItemLayout
                        left={leftElement}
                        right={rightElement}
                    />
                </li>
            );
        });

        return (
            <div>
                <h2>Issue from npm/npm</h2>
                <IssueDetailHeader issue={issue} />
                <ul>
                    {commentList}
                </ul>
                <ScrollUp/>
            </div>
        );
    }
}

IssueDetail.propTypes = {
    routeParams: React.PropTypes.object
};

IssueDetail = connectToStores(IssueDetail, [IssueStore], (context, props) => {
    const issueStore = context.getStore(IssueStore);
    return {
        comments: issueStore.getComments(),
        issue: issueStore.getCurrentIssue(),
        error: issueStore.getError()
    };
});

export default IssueDetail;
