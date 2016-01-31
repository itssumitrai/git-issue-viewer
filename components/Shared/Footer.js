/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="Ta-end Mb-10px">
                <span className="C-Gray">{'Copyright ©' + new Date().getFullYear() + ', Sumit Rai'}</span>
            </footer>
        );
    }
}

export default Footer;
