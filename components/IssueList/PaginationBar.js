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
        const pageNumbers = getPageNumbers(props.pageNumber, props.pagesToShow).map((number) => {
            if (number === props.pageNumber) {
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
                        href="#"
                        className="link C-LinkBlue"
                        routeName="issueList"
                        navParams={{ pageNumber: number }}
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
                            href="#"
                            className="link C-LinkBlue Fl-start"
                            routeName="issueList"
                            navParams={{ pageNumber: Math.max(props.pageNumber - 1, 1) }}
                            title="Previous"
                        >
                            {strings.PREVIOUS}
                        </NavLink>
                    </li>
                    {pageNumbers}
                    <li key="next" className="page">
                        <NavLink
                            href="#"
                            className="link C-LinkBlue Fl-end"
                            routeName="issueList"
                            navParams={{ pageNumber: Math.min(props.pageNumber + 1, props.totalPages) }}
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
    pageNumber: React.PropTypes.number.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    pagesToShow: React.PropTypes.number
};

PaginationBar.defaultProps = {
    pageNumber: 1,
    totalPages: 25,
    pagesToShow: 9
};

export default PaginationBar;
