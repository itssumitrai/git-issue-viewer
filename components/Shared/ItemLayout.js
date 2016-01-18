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
            <div className="item">
                <div className="left-col">
                    {props.left}
                </div>
                <div className="right-col">
                    {props.right}
                </div>
            </div>
        );
    }
}

ItemLayout.propTypes = {
    left: React.PropTypes.node,
    right: React.PropTypes.node
};

export default ItemLayout;
