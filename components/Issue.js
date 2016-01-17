/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

// Components

// Stores
import IssueStore from '../stores/IssueStore';

// utils
import { connectToStores } from 'fluxible-addons-react';

class Issue extends React.Component {
    render() {
        const { issue } = this.props;
        return (
            <div>
                <h2>Issue</h2>
                <div>{issue.title}</div>
                <div>{issue.state}</div>
                <p>{issue.body}</p>
            </div>
        );
    }
}

Issue.propTypes = {
};

Issue.defaultProps = {
};

Issue = connectToStores(Issue, [IssueStore], (context, props) => {
    return {
        issue: context.getStore(IssueStore).getCurrentIssue()
    }
});

export default Issue;
