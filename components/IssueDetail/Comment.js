/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import IssueDate from '../Shared/IssueDate';
import { getParsedMarkupContent } from '../../lib/utils';

class Comment extends React.Component {
    render() {
        const { issue } = this.props;
        let ownerLabel;
        if (issue.user.site_admin) {
            ownerLabel = <span className="labelBox Fl-end">Owner</span>
        }

        return (
            <div className="comment ShadowBox">
                <div className="bar">
                    <IssueDate className="Fz-s C-Gray" dateType="comment" date={issue.created_at}/>
                    {ownerLabel}
                </div>
                <div className="content">
                    <p className="Ov-h Lh-20px" dangerouslySetInnerHTML={getParsedMarkupContent(issue.body, true)} />
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    issue: React.PropTypes.object.isRequired
};

export default Comment;
