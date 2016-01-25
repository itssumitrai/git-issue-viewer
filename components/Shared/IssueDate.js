/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { getTimestamp } from '../../lib/utils';
import { FormattedMessage, FormattedRelative } from 'react-intl';

const PREFIX_TYPE_MAP = {
    comment: 'COMMENTED',
    list: 'ISSUE_OPENED',
    create: 'OPENED_THIS_ISSUE',
    refer: 'REFER'
};

class IssueDate extends React.Component {
    render() {
        const { props } = this;
        const dateValue = getTimestamp(this.props.date);

        return (
            <span className={'create-date ' + this.props.className}>
                <FormattedMessage id={PREFIX_TYPE_MAP[props.dateType]}/>&nbsp;<FormattedRelative value={dateValue}/>
            </span>
        );
    }
}

IssueDate.propTypes = {
    className: React.PropTypes.string,
    dateType: React.PropTypes.oneOf(['comment', 'list', 'create', 'refer']),
    date: React.PropTypes.string.isRequired   // Date in timestring format
};

IssueDate.defaultProps = {
    className: '',
    dateType: 'comment'
};

export default IssueDate;
