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

class Date extends React.Component {
    render() {
        const { props } = this;
        const dateValue = getTimestamp(this.props.date);

        return (
            <span className={'create-date ' + this.props.className}>
                <FormattedMessage id={PREFIX_TYPE_MAP[props.type]}/>&nbsp;<FormattedRelative value={dateValue}/>
            </span>
        );
    }
}

Date.propTypes = {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    date: React.PropTypes.string.isRequired
};

Date.defaultProps = {
    type: 'comment'
};

export default Date;
