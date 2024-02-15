import React from 'react';
import css from './Pagination.module.css';
import {getPagesArray} from "../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    let classNames = [css.page, css.active].join(' ');

    return (
        <div className={css.pages}>
            {pagesArray.map(p =>
                <span onClick={() => changePage(p)} key={p} className={page === p ? classNames : css.page}>
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;
