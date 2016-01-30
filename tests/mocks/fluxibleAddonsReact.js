/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { createMockComponentContext } from 'fluxible/utils';

export default {
    connectToStores: (Component, stores, callback) => {
        let context = createMockComponentContext({
            stores: stores
        });

        callback(context, { routeParams: { get: function(){} }});
        return Component;
    },
    provideContext: (component) => {
        return component;
    }
};
