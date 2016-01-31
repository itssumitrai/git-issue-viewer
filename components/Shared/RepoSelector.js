/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { NavLink, navigateAction } from 'fluxible-router';

const DIVIDER = '/';

class RepoSelector extends React.Component {
    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            textChanged: false
        };
        this.onSwitchEditable = this.onSwitchEditable.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSwitchRepo = this.onSwitchRepo.bind(this);
        this.onTextSubmit = this.onTextSubmit.bind(this);
    }

    renderHeading() {
        const { props } = this;
        let textMessage = (
            <FormattedMessage
                id="ALL_ISSUES"
                values={{ owner: props.owner, repo: props.repo }}
            />
        );

        if (!props.headingLink) {
            // If headingLink is false, just return heading (h2)
            return (
                <h2 id="heading" className="Mt-10px Mb-0">{textMessage}</h2>
            );
        }

        // Otherwise, If headingLink is true, make the heading as a link
        // We still render a hidden h2 for accessibility purpose.
        return (
            <div className="heading-text Mt-10px">
                <h2 id="heading" className="hidden-text">{textMessage}</h2>
                <NavLink
                    className="titleLink Fz-m bold"
                    routeName="issueList"
                    navParams={{
                        owner: props.owner,
                        repo: props.repo,
                        page: '1'
                    }}
                >
                    {textMessage}
                </NavLink>
            </div>
        );
    }

    onSwitchEditable(isEditable) {
        this.setState({
            editable: isEditable
        });
    }

    onTextChange() {
        this.setState({
            textChanged: true
        });
    }

    onTextSubmit(e) {
        if (e.charCode === 13) {
            this.onSwitchRepo();
        }
    }

    onSwitchRepo() {
        // navigate to the new repo issues
        this.context.executeAction(navigateAction, {
            routeName: 'issueList',
            params: {
                owner: this.refs.owner.value || this.refs.owner.placeholder,
                repo: this.refs.repo.value || this.refs.repo.placeholder,
                page: '1'
            }
        });
        // Now the component is no more editable
        this.onSwitchEditable(false);
    }

    renderForm() {
        const { props } = this;

        if (!this.state.editable) {
            return (
                <div className="form-container D-ib">
                    <button
                        onClick={this.onSwitchEditable.bind(this, true)}
                        className="Fw-b Fz-l static-form C-Gray"
                        title={this.props.intl.formatMessage({id: 'CLICK_TO_CHANGE'})}
                    >
                        <span className="mega-octicon octicon-repo C-Gray Va-m Mend-10px" />
                        {props.owner + ' / ' + props.repo}
                    </button>
                </div>
            );
        }

        let buttonContainer = (
            <button type="submit" className="cancel Mstart-10px" onClick={this.onSwitchEditable.bind(this, false)}>
                <FormattedMessage id="CANCEL" />
            </button>
        );

        if (this.state.textChanged) {
            // Show button only when some value was changed
            buttonContainer = (
                <span>
                    <button type="submit" className="show-issues Mstart-10px" onClick={this.onSwitchRepo}>
                        <span className="octicon octicon-search"/>&nbsp;
                        <FormattedMessage id="SHOW_ALL_ISSUES" />
                    </button>
                    <button className="cancel Mstart-10px" onClick={this.onSwitchEditable.bind(this, false)}>
                        <FormattedMessage id="CANCEL" />
                    </button>
                </span>
            );
        }

        return (
            <div className="form-container D-ib">
                <span className="mega-octicon octicon-repo C-Gray Va-m Mend-10px" />
                <span className="D-ib" onSubmit={this.onSwitchRepo} role="form">
                    <input ref="owner" type="text" className="Mend-10px Fz-l" onChange={this.onTextChange} onKeyPress={this.onTextSubmit} placeholder={props.owner} required/>
                    <span className="Mend-10px">{DIVIDER}</span>
                    <input ref="repo" type="text" className="Fz-l" onChange={this.onTextChange} onKeyPress={this.onTextSubmit} placeholder={props.repo} required/>
                    {buttonContainer}
                </span>
            </div>
        );
    }

    render() {
        return (
            <section className="repo-selector" aria-label="Top Header">
                {this.renderForm()}
                {this.renderHeading()}
            </section>
        );
    }
}

RepoSelector.propTypes = {
    owner: React.PropTypes.string.isRequired,
    repo: React.PropTypes.string.isRequired,
    headingLink: React.PropTypes.bool    // decides whether to show heading as text or a link
};

RepoSelector.defaultProps = {
    headingLink: false
};

export let Component = RepoSelector;
export default injectIntl(RepoSelector);
