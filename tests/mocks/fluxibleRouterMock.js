/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import routes from '../../configs/routes';

class NavLink extends React.Component {
    static displayName = 'NavLink';

    generateHref() {
        let route = routes[this.props.routeName];
        if (route) {
            let path = route.path;
            (Object.keys(this.props.navParams)).forEach(function (routeParam) {
                path = path.replace(':' + routeParam, this.props.navParams[routeParam]);
            }, this);

            return path;
        }
    }

    render() {
        const href = this.props.href || this.generateHref();

        return (
            <a {...this.props} href={href}>
                {this.props.children}
            </a>
        );
    }
}

export default {
    NavLink: NavLink
};