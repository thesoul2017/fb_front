import React, {useEffect, useState} from 'react';
import {Bar} from "react-chartjs-2";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {HiArrowsPointingIn, HiArrowsPointingOut} from "react-icons/hi2";

const BarChart = ({data, period}) => {

    const [options, setOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            x: {
                min: null,
                max: null,
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        'day': 'dd.MM',
                    }
                }
            }
        }
    });
    const [fullSize, setFullSize] = useState(false);

    let dataCharts = {
        datasets: [
            {
                label: 'Доходы',
                data: data.up,
                parsing: {
                    yAxisKey: 'total'
                },
                borderColor: '#34a950',
                backgroundColor: '#34a950',
            },
            {
                label: 'Расходы',
                data: data.down,
                parsing: {
                    yAxisKey: 'total'
                },
                borderColor: '#eb4235',
                backgroundColor: '#eb4235',
            }
        ]
    };

    useEffect(() => {
        if (period) {
            setOptions(options => (
                {
                    ...options,
                    scales: {
                        x: {
                            min: period[0],
                            max: period[1],
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    'day': 'dd.MM',
                                }
                            }
                        }
                    }
                }
            ));
        } else {
            setOptions(options => (
                {
                    ...options,
                    scales: {
                        x: {
                            min: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                            max: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    'day': 'dd.MM',
                                }
                            }
                        }
                    }
                }
            ));
        }

    }, [period]);

    return (
        <div className={fullSize ? "block chart-block full-size" : "block chart-block"}>
            <button className="resize" onClick={() => setFullSize(!fullSize)}>
                {fullSize ? <HiArrowsPointingIn/> : <HiArrowsPointingOut/>}
            </button>
            <Bar options={options} data={dataCharts}/>
        </div>
    );
};

export default BarChart;
