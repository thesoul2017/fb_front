import React from 'react';
import css from './Sorting.module.css';

const Sorting = ({options, value, defaultValue, onChange}) => {

    const onSort = (value) => {
        value.length === 0 ? onChange(value) : onChange(value.split(','));
    }

    return (
        <select value={value} onChange={event => onSort(event.target.value)} className={css.sort}>
            <option value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Sorting;
