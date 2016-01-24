/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import fetchrPlugin from 'fluxible-plugin-fetchr';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(require('./stores/IssueListStore'));
app.registerStore(require('./stores/IssueStore'));

module.exports = app;
