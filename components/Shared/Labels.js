/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class Labels extends React.Component {
    render() {
        const labels = this.props.labels.map((label, index) => {
            return (
                <li key={index} className="label bold Bdrs" style={{ backgroundColor: '#' + label.color }}>
                    {label.name}
                </li>
            )
        });

        return (
            <ul className="labels">
                {labels}
            </ul>
        );
    }
}

Labels.propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Labels;
