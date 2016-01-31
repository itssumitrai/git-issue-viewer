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
import RepoSelector from './Shared/RepoSelector';
import Footer from './Shared/Footer';

// Stores
import IssueStore from '../stores/IssueStore';

// utils
import { connectToStores } from 'fluxible-addons-react';

class IssueDetail extends React.Component {
    render() {
        const { issue, comments, error } = this.props;

        if (!issue && error) {
            return (
                <section class="error-message" aria-label="Error Message">{error}</section>
            );
        } else if (!issue) {
            return (
                <section className="spinner" aria-label="Issue Detail" aria-busy="true">
                    <div className="image"/>
                </section>
            );
        }

        const owner = this.props.routeParams.get('owner');
        const repo = this.props.routeParams.get('repo');

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
                <main>
                    <RepoSelector owner={owner} repo={repo} headingLink={true}/>
                    <section aria-labelledby="issueTitle">
                        <IssueDetailHeader issue={issue} />
                        <ul>
                            {commentList}
                        </ul>
                        <ScrollUp/>
                    </section>
                </main>
                <Footer/>
            </div>
        );
    }
}

IssueDetail.propTypes = {
    routeParams: React.PropTypes.object.isRequired
};

IssueDetail = connectToStores(IssueDetail, [IssueStore], (context, props) => {
    const issueStore = context.getStore(IssueStore);
    //get the current issueNumber from route
    const currIssueNumber = parseInt(props.routeParams.get('issueNumber'), 10);
    // This is to ensure that we are fetching data only for the current issue, and not the previous one

    return {
        comments: issueStore.getComments(currIssueNumber),
        issue: issueStore.getCurrentIssue(currIssueNumber),
        error: issueStore.getError(currIssueNumber)
    };
});

export default IssueDetail;
