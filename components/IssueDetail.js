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

// Stores
import IssueStore from '../stores/IssueStore';

// utils
import { connectToStores } from 'fluxible-addons-react';

class IssueDetail extends React.Component {
    render() {
        const { issue } = this.props;
        if (!issue || Object.keys(issue).length === 0) {
            return null;
        }

        const left = <UserTile user={issue.user} />;
        const right = <Comment issue={issue} />;
        return (
            <div>
                <h2>Issue from npm/npm</h2>
                <IssueDetailHeader issue={issue} />
                <ItemLayout
                    left={left}
                    right={right}
                />
            </div>
        );
    }
}

IssueDetail.propTypes = {
    routeParams: React.PropTypes.object
};

IssueDetail = connectToStores(IssueDetail, [IssueStore], (context, props) => {
    return {
        issue: context.getStore(IssueStore).getCurrentIssue()
    }
});

export default IssueDetail;
