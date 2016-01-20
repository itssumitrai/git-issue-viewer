/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

// Components
import IssueListItem from './IssueList/IssueListItem';
import ItemLayout from './Shared/ItemLayout';
import UserTile from './Shared/UserTile';
import PaginationBar from './IssueList/PaginationBar';

// Stores
import IssueListStore from '../stores/IssueListStore';

// utils
import { connectToStores } from 'fluxible-addons-react';
import appConfig from '../configs/app';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: props.routeParams.get('owner'),
            repo: props.routeParams.get('repo'),
            pageNumber: props.routeParams.get('page')
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.routeParams.equals(this.props.routeParams)) {
            this.setState({
                owner: nextProps.routeParams.get('owner'),
                repo: nextProps.routeParams.get('repo'),
                pageNumber: nextProps.routeParams.get('page')
            });
        }
    }

    renderIssue(issue) {
        const left = <UserTile user={issue.user} />;
        const right = <IssueListItem routeParams={this.props.routeParams} issue={issue} />;

        return (
            <li key={issue.id}>
                <ItemLayout
                    left={left}
                    right={right}
                />
            </li>
        );
    }

    render() {
        const { props, state } = this;
        let issueListItems = props.issues && props.issues.map(this.renderIssue, this);

        return (
            <div>
                <h2>All Issues from {state.owner}/{state.repo}</h2>
                <PaginationBar routeParams={props.routeParams} pageNumber={state.pageNumber} totalPages={25}/>
                <ul className="issue-list">
                    {issueListItems}
                </ul>
                <PaginationBar routeParams={props.routeParams} pageNumber={state.pageNumber} totalPages={25}/>
            </div>
        );
    }
}

IssueList.propTypes = {
    itemsPerPage: React.PropTypes.number,
    routeParams: React.PropTypes.object.isRequired
};

IssueList.defaultProps = {
    itemsPerPage: appConfig.itemsPerPage
};

IssueList = connectToStores(IssueList, [IssueListStore], (context, props) => {
    return {
        issues: context.getStore(IssueListStore).getIssues()
    };
});

export default IssueList;
