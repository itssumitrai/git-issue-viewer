/*globals document*/

'use strict';

import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import IssueList from '../components/IssueList';
import { IntlProvider } from 'react-intl';
import strings from '../lang/strings.json';

class Application extends React.Component {
    render() {
        var Component = this.props.currentRoute.get('component');
        return (
            <div>
                <IntlProvider locale="en" messages={strings} initialNow={Date.now()} >
                    <Component routeParams={this.props.currentRoute.get('params')}/>
                </IntlProvider>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
