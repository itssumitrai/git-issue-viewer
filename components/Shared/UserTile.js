/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class UserTile extends React.Component {
    render() {
        const { props } = this;
        return (
            <div className="user-info">
                <a href={props.user.html_url}>
                    <img src={props.user.avatar_url} className="gravatar" alt={props.user.login}/>
                </a>
                <div className="gravatar-info">
                    <a href={props.user.html_url} className="link Fw-b C-Gray">{props.user.login}</a>
                </div>
            </div>
        );
    }
}

UserTile.propTypes = {
    user: React.PropTypes.object.isRequired
};

export default UserTile;
