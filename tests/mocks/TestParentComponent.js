/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

export default class TestParentComponent extends React.Component {
    static propTypes = {
        Component: React.PropTypes.node.isRequired,
        compProps: React.PropTypes.object
    };

    static defaultProps = {
        compProps: {}
    };

    constructor(props) {
        super(props);
        this.state = props.compProps;
    }

    render() {
        let { Component } = this.props;
        return React.createElement(Component, this.state);
    }
}
