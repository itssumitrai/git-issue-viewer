/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class ItemLayout extends React.Component {
    render() {
        const { props } = this;
        return (
            <li key={props.id} className="item">
                <div className="left-col">
                    {props.left}
                </div>
                <div className="right-col">
                    {props.right}
                </div>
            </li>
        );
    }
}

ItemLayout.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    left: React.PropTypes.node,
    right: React.PropTypes.node
};

export default ItemLayout;
