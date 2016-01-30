/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';

class Error extends React.Component {
    render() {
        const { error } = this.props;

        let errorHeading = 'Oops, Encountered an Error';

        return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Oops! Error...</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.3.0/octicons.min.css" />
                <link rel="stylesheet" href="/public/app.css" />
            </head>
            <body>
                <main className="error-page Center">
                    <section aria-labelledby="heading">
                        <div>
                            <span className="mega-octicon octicon-octoface icon"/>
                            <div className="D-ib">
                                <h2 id="heading" className="D-ib Fw-b">{errorHeading}</h2>
                                <div className="Fw-b status">{error.statusCode}</div>
                            </div>
                        </div>
                        <div className="message Fz-l">
                            <p>{error.message}</p>
                        </div>
                    </section>
                </main>
            </body>
        </html>
        );
    }
}

Error.propTypes = {
    error: React.PropTypes.object
};

export default Error;
