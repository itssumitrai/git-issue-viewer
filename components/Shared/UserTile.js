/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class UserTile extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <div className="user-info" title={user.login}>
                <a href={user.html_url}>
                    <img src={user.avatar_url} className="gravatar" alt={user.login}/>
                </a>
                <div className="gravatar-info">
                    <a href={user.html_url} className="link Fw-b C-Gray">{user.login}</a>
                </div>
            </div>
        );
    }
}

UserTile.propTypes = {
    user: React.PropTypes.object.isRequired
};

export default UserTile;
