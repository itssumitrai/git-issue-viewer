/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';
import { getPageNumbers } from '../../lib/utils';
import strings from '../../lang/strings.json';

class PaginationBar extends React.Component {
    render() {
        const { props } = this;
        const { routeParams } = props;
        const currentUrlPrefix = '/' + routeParams.get('owner') + '/' + routeParams.get('repo') + '/';
        const pageNumber = parseInt(props.pageNumber, 10);

        const pageNumbers = getPageNumbers(pageNumber, props.pagesToShow).map((number) => {
            if (number === pageNumber) {
                return (
                    <li key={number} className="page number selected">
                        <span className="Fw-b">{number}</span>
                    </li>
                );
            }

            return (
                <li key={number} className="page number">
                    <NavLink
                        key={number}
                        href={currentUrlPrefix + number}
                        className="link C-LinkBlue"
                        title="Next"
                    >
                        {number}
                    </NavLink>
                </li>
            );
        });

        return (
            <div className="pagination ShadowBox">
                <ul className="page-number-list">
                    <li key="previous" className="page">
                        <NavLink
                            className="link C-LinkBlue Fl-start"
                            href={currentUrlPrefix + Math.max(pageNumber - 1, 1)}
                            title="Previous"
                        >
                            {strings.PREVIOUS}
                        </NavLink>
                    </li>
                    {pageNumbers}
                    <li key="next" className="page">
                        <NavLink
                            href={currentUrlPrefix + Math.min(pageNumber + 1, props.totalPages)}
                            className="link C-LinkBlue Fl-end"
                            title="Next"
                        >
                            {strings.NEXT}
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

PaginationBar.propTypes = {
    routeParams: React.PropTypes.object.isRequired,
    pageNumber: React.PropTypes.string.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    pagesToShow: React.PropTypes.number
};

PaginationBar.defaultProps = {
    pageNumber: '1',
    totalPages: 25,
    pagesToShow: 9
};

export default PaginationBar;
