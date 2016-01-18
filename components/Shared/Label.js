/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class Label extends React.Component {
    render() {
        const { props } = this;
        const { label } = props;

        return (
            <li
                key={props.key}
                title={label.name}
                className="label bold Bdrs"
                style={{ backgroundColor: '#' + label.color }}
            >
                <a href={label.url}>{label.name}</a>
            </li>
        );
    }
}

Label.propTypes = {
    key: React.PropTypes.number,
    label: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
};

export default Label;
