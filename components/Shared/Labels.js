/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

import Label from './Label';

class Labels extends React.Component {
    render() {
        const labels = this.props.labels.map((label, index) => {
            return <Label key={index} label={label} />
        });

        return (
            <ul className={'labels ' + this.props.className }>
                {labels}
            </ul>
        );
    }
}

Labels.propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    className: React.PropTypes.string
};

Labels.defaultProps = {
    className: ''
};

export default Labels;
