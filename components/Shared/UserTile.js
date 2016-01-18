/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class UserTile extends React.Component {
    render() {
        const login = '@' + this.props.login;

        return (
            <div className="user-info">
                <img src={this.props.imgUrl} className="gravatar" alt={login}/>
                <div className="gravatar-info">
                    {login}
                </div>
            </div>
        );
    }
}

UserTile.propTypes = {
    imgUrl: React.PropTypes.string.isRequired,
    login: React.PropTypes.string.isRequired
};

export default UserTile;
