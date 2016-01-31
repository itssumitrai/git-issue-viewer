/* globals expect, before, after, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import jsx from 'jsx-test';
import mockery from 'mockery';

describe('Error', function () {
    let ErrorComponent;

    before(function () {
        mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
        mockery.registerMock('./Shared/Footer', jsx.stubComponent('Footer', null, true));
        ErrorComponent = require('../../../components/Error');
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#render', function () {
        let props;
        beforeEach(function () {
            props = {
                error: {
                    statusCode: 404,
                    message: 'Not Found'
                }
            };
        });

        it('should render html tag and head', function () {
            jsx.assertRender(ErrorComponent, props,
                '<html>' +
                    '<head>' +
                        '<meta charset="utf-8"/>' +
                        '<title>Oops! Error...</title>' +
                        '<meta name="viewport" content="width=device-width, user-scalable=no"/>' +
                        '<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css"/>' +
                        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.3.0/octicons.min.css"/>' +
                        '<link rel="stylesheet" href="/public/app.css"/>' +
                    '</head>'
            );
        });

        it('should render error page', function () {
            props.state = 'closed';
            jsx.assertRender(ErrorComponent, props,
                '<body>' +
                    '<main+>' +
                        '<section+>*' +
                            '<span class="mega-octicon octicon-octoface icon"></span>*' +
                            '<h2+>Oops, Encountered an Error</h2>' +
                            '<div+>404</div>*' +
                            '<div+>' +
                                '<p>Not Found</p>' +
                            '</div>' +
                        '</section>' +
                    '</main>' +
                    '<Footer></Footer>' +
                '</body>'
            );
        });
    });
});
