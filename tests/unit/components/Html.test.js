/* globals expect, before, beforeEach, it, describe */
/*eslint no-underscore-dangle:0*/
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { createMockComponentContext } from 'fluxible/utils';
import ApplicationStore from '../../../stores/ApplicationStore';
import RouteStore from '../../../stores/RouteStore';
import Immutable from 'immutable';
import jsx from 'jsx-test';

describe('Html', function () {
    let Html;

    before(function () {
        Html = require('../../../components/Html');
    });

    describe('#render', function () {
        let context;
        let props;

        beforeEach(function () {
            context = createMockComponentContext({
                stores: [ApplicationStore, RouteStore]
            });

            context.getStore(ApplicationStore).rehydrate({
                pageTitle: 'This is the page title'
            });

            context.getStore(RouteStore)._currentRoute = Immutable.fromJS({
                name: 'issueList',
                title: 'List of all Issues'
            });

            props = {
                markup: '<p>some markup</p>',
                state: 'window.App={context: {}}',
                clientFile: 'main.js',
                context: context
            };
        });

        it('should render html markup for the page', function () {
            jsx.assertRender(Html, props,
                '<html>' +
                    '<head>' +
                        '<meta charset="utf-8"/>' +
                        '<title>This is the page title</title>' +
                        '<meta name="viewport" content="width=device-width, user-scalable=no"/>' +
                        '<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css"/>' +
                        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.3.0/octicons.min.css"/>' +
                        '<link rel="stylesheet" href="/public/app.css"/>' +
                    '</head>' +
                    '<body>' +
                        '<div id="app">' +
                            '<p>some markup</p>' +
                        '</div>' +
                        '<script>window.App={context: {}}</script>' +
                        '<script src="/public/main.js"></script>' +
                    '</body>' +
                '</html>'
            );
        });
    });
});
