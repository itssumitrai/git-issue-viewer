/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';
import { getPageNumbers } from '../../lib/utils';
import { FormattedMessage } from 'react-intl';
import appConfig from '../../configs/app';

class PaginationBar extends React.Component {

    renderPageNumbers(pageNumber, currentUrlPrefix, lastPageNumber) {
        // Render page Numbers in the pagination bar

        return getPageNumbers(pageNumber, lastPageNumber, this.props.pagesToShow).map((number) => {
            if (number === pageNumber) {
                return (
                    <li key={number} className="page number selected">
                        <span className="Fw-b Fz-m">{number}</span>
                    </li>
                );
            }

            return (
                <li key={number} className="page number">
                    <NavLink
                        key={number}
                        href={currentUrlPrefix + number}
                        className="Td-n C-LinkBlue Fz-m"
                    >
                        {number}
                    </NavLink>
                </li>
            );
        });
    }

    renderPreviousLink(pageNumber, currentUrlPrefix, paginationInfo) {
        // Render previous link

        if (paginationInfo.prev) {
            return (
                <li key="previous" className="page number">
                    <NavLink
                        className="Td-n C-LinkBlue Fz-m Mend-5px"
                        href={currentUrlPrefix + paginationInfo.prev}
                    >
                        <FormattedMessage id="PREVIOUS" />
                    </NavLink>
                </li>
            );
        }

        return (
            <li key="previous" className="page disabled Mend-5px">
                <span className="Fz-m"><FormattedMessage id="PREVIOUS" /></span>
            </li>
        );
    }

    renderNextLink(pageNumber, currentUrlPrefix, paginationInfo) {
        // Render next link

        if(paginationInfo.next) {
            return (
                <li key="next" className="page number">
                    <NavLink
                        href={currentUrlPrefix + paginationInfo.next}
                        className="Td-n C-LinkBlue Fz-m Mstart-5px"
                    >
                        <FormattedMessage id="NEXT" />
                    </NavLink>
                </li>
            );
        }

        return (
            <li key="next" className="page disabled Mstart-5px">
                <span className="Fz-m"><FormattedMessage id="NEXT" /></span>
            </li>
        );
    }

    render() {
        const { props } = this;
        const { routeParams, paginationInfo } = props;
        const currentUrlPrefix = '/' + routeParams.get('owner') + '/' + routeParams.get('repo') + '/';
        const pageNumber = parseInt(props.pageNumber, 10);
        // In case when we are on last Page, the api doesn't have last page information
        const lastPageNumber = paginationInfo.last ? parseInt(paginationInfo.last, 10) : pageNumber;

        return (
            <nav className="pagination ShadowBox">
                <ul className="page-number-list">
                    {this.renderPreviousLink(pageNumber, currentUrlPrefix, paginationInfo)}
                    {this.renderPageNumbers(pageNumber, currentUrlPrefix, lastPageNumber)}
                    {this.renderNextLink(pageNumber, currentUrlPrefix, paginationInfo)}
                </ul>
            </nav>
        );
    }
}

PaginationBar.propTypes = {
    routeParams: React.PropTypes.object.isRequired,
    pageNumber: React.PropTypes.string.isRequired,
    pagesToShow: React.PropTypes.number,
    paginationInfo: React.PropTypes.object.isRequired    // gives info about the pagination extracted from response header
};

PaginationBar.defaultProps = {
    pageNumber: '1',
    pagesToShow: appConfig.pagesToShow,
    paginationInfo: {}
};

export default PaginationBar;
