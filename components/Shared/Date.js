/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

const PREFIX_TYPE_MAP = {
    comment: 'commented ',
    list: 'issue opened ',
    create: 'opened this issue ',
    refer: 'referenced this issue '
};

class Date extends React.Component {
    render() {
        const { props } = this;
        return (
            <span className={'create-date ' + this.props.className}>
                {PREFIX_TYPE_MAP[props.type] + this.props.date}
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
