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
import ScrollUp from './Shared/ScrollUp';
import RepoSelector from './Shared/RepoSelector';
import Footer from './Shared/Footer';

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
            pageNumber: props.routeParams.get('page'),
            scrollVisible: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.routeParams.equals(this.props.routeParams)) {
            this.setState({
                owner: nextProps.routeParams.get('owner'),
                repo: nextProps.routeParams.get('repo'),
                pageNumber: nextProps.routeParams.get('page'),
                scrollVisible: false
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

    renderMainContent() {
        if (this.props.isLoading) {
            return (
                <section className="spinner" aria-labelledby="heading" aria-busy="true">
                    <div className="image"/>
                </section>
            );
        } else {
            return (
                <section aria-labelledby="heading">
                    <ul className="issue-list">
                        {this.props.issues.map(this.renderIssue, this)}
                    </ul>
                </section>
            );
        }
    }

    render() {
        const { props, state } = this;

        if (!props.isLoading) {
            if (!props.issues || props.issues.length === 0 || props.error) {
                let errorMessage = props.error || 'Could not get Data';

                return (
                    <section class="error-message" aria-label="Error Message">{errorMessage}</section>
                );
            }
        }

        return (
            <div>
                <main>
                    <RepoSelector owner={state.owner} repo={state.repo}/>
                    <PaginationBar paginationInfo={props.paginationInfo} routeParams={props.routeParams} pageNumber={state.pageNumber} />
                    {this.renderMainContent()}
                    <PaginationBar paginationInfo={props.paginationInfo} routeParams={props.routeParams} pageNumber={state.pageNumber} />
                    <ScrollUp/>
                </main>
                <Footer/>
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
    const issueListStore = context.getStore(IssueListStore);
    return {
        issues: issueListStore.getIssues(),
        error: issueListStore.getError(),
        isLoading: issueListStore.isLoading(),
        paginationInfo: issueListStore.getPageInfo()
    };
});

export default IssueList;
