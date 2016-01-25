/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

var React = require('react');
var strings = require('../../lang/strings.json');

function formatMessage (obj, values) {
    var mess = strings[obj.id];
    values && Object.keys(values).forEach(function (value) {
        mess = mess.replace('{' + value + '}', values[value]);
    });

    return mess;
}

export default {
    FormattedRelative: React.createClass({
        render: function () {
            var props = {};
            if (this.props.debug) {
                props.dataProps = this.props;
            }
            return React.createElement('span', props, this.props.value);
        }
    }),

    FormattedNumber: React.createClass({
        render: function () {
            var props = {};
            if (this.props.debug) {
                props.dataProps = this.props;
            }
            return React.createElement('span', props, this.props.value);
        }
    }),

    FormattedDate: React.createClass({
        render: function () {
            var props = {};
            if (this.props.debug) {
                props.dataProps = this.props;
            }
            return React.createElement('span', props, new Date(this.props.value).toString());
        }
    }),

    FormattedMessage: React.createClass({
        render: function () {
            return React.createElement('span', {}, formatMessage(this.props, this.props.values));
        }
    }),

    injectIntl: (WrappedComponent, options) => {
        var intl = {
            formatMessage: formatMessage
        };

        var InjectIntl = React.createClass({
            render: function () {
                return React.createElement(WrappedComponent, Object.assign({},
                    this.props,
                    { intl: intl }
                ));
            }
        });

        InjectIntl.displayName = WrappedComponent.displayName;
        InjectIntl.WrappedComponent = WrappedComponent;
        return InjectIntl;
    }
};