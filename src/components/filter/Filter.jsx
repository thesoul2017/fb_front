import React, {useState} from 'react';
import css from './Filter.module.css';
import {LuFilter, LuFilterX} from "react-icons/lu";
import {
    endOfMonth,
    endOfToday, endOfWeek,
    endOfYear,
    format,
    startOfMonth,
    startOfToday,
    startOfWeek,
    startOfYear
} from "date-fns";

const filterTypes = [
    {type: 'day', name: 'День'},
    {type: 'week', name: 'Неделя'},
    {type: 'month', name: 'Месяц'},
    {type: 'year', name: 'Год'},
]

const Filter = ({onChange, rangeFrom, rangeTo, setRangeFrom, setRangeTo, isRange = true}) => {
    const [filterType, setFilterType] = useState('');

    const onFilter = (type) => {
        setFilterType(type);

        if (type === filterType) {
            onChange(null);
            setFilterType('');
        }
        else {
            switch (type) {
                case 'day': {
                    const dateFrom = format(startOfToday(), 'yyyy-MM-dd');
                    const dateTo = format(endOfToday(), 'yyyy-MM-dd');
                    onChange([dateFrom, dateTo]);

                    break;
                }
                case 'week': {
                    const dateFrom = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
                    const dateTo = format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
                    onChange([dateFrom, dateTo]);

                    break;
                }
                case 'month': {
                    const dateFrom = format(startOfMonth(new Date()), 'yyyy-MM-dd');
                    const dateTo = format(endOfMonth(new Date()), 'yyyy-MM-dd');
                    onChange([dateFrom, dateTo]);

                    break;
                }
                case 'year': {
                    const dateFrom = format(startOfYear(new Date()), 'yyyy-MM-dd');
                    const dateTo = format(endOfYear(new Date()), 'yyyy-MM-dd');
                    onChange([dateFrom, dateTo]);

                    break;
                }
                case 'range': {
                    onChange([rangeFrom, rangeTo]);

                    break;
                }

                case 'reset': {
                    onChange(null);
                    setRangeFrom('');
                    setRangeTo('');
                    setFilterType('');

                    break;
                }
            }
        }
    }

    return (
        <div className={css.filter}>
            <div className={css.filterButton}>
                {filterTypes.map(item =>
                    <button key={item.type}
                            className={filterType === item.type ? `${css.active}` : null}
                            onClick={() => onFilter(item.type)}>
                        {item.name}
                    </button>
                )}
            </div>

            {/*<button className={filterType === "day" ? `${css.active} ${css.day}` : css.day}*/}
            {/*        onClick={() => onFilter('day')}>День</button>*/}
            {/*<button className={filterType === "week" ? `${css.active} ${css.week}` : css.week}*/}
            {/*        onClick={() => onFilter('week')}>Неделя</button>*/}
            {/*<button className={filterType === "month" ? `${css.active} ${css.month}` : css.month}*/}
            {/*        onClick={() => onFilter('month')}>Месяц</button>*/}
            {/*<button className={filterType === "year" ? `${css.active} ${css.year}` : css.year}*/}
            {/*        onClick={() => onFilter('year')}>Год</button>*/}

            {isRange &&
            <div className={css.range}>
                <input className="inp" value={rangeFrom}
                       onChange={e => setRangeFrom(e.target.value)} placeholder="От" type="date"/>
                <input className="inp margin-hor-6" value={rangeTo}
                       onChange={e => setRangeTo(e.target.value)} placeholder="До" type="date"/>

                <button className="icon-btn" disabled={rangeFrom === '' || rangeTo === ''}
                        onClick={() => onFilter('range')}>
                    <LuFilter/>
                </button>

                <button className="icon-btn" disabled={filterType !== 'range'} onClick={() => onFilter('reset')}>
                    <LuFilterX/>
                </button>

            </div>
            }

        </div>
    );
};

export default Filter;
