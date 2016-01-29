/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import appConfig from '../../configs/app';

class Label extends React.Component {
    render() {
        const { props } = this;
        const { label } = props;
        const labelUrl = label.url.replace(appConfig.apiHost + 'repos/', appConfig.gitHubHost);

        return (
            <li
                key={props.key}
                title={label.name}
                className="label bold Bdrs"
                style={{ backgroundColor: '#' + label.color }}
            >
                <a href={labelUrl} target="_blank">{label.name}</a>
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
