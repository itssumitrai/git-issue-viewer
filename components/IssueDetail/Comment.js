/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import marked from 'marked';
import Date from '../Shared/Date';
import { getParsedMarkupContent } from '../../lib/utils';

class Comment extends React.Component {
    render() {
        const { issue } = this.props;
        const ownerLabel = issue.user.site_admin || true ? 'Owner' : '';

        return (
            <div className="comment ShadowBox">
                <p className="Ov-h Lh-20px" dangerouslySetInnerHTML={{ __html: marked(issue.body) }} />
                <div className="Mt-10px">
                    <span className="labelBox">{ownerLabel}</span>
                    <Date className="Fl-end Fz-s C-Gray" type="comment" date={issue.created_at}/>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    issue: React.PropTypes.object.isRequired
};

export default Comment;
