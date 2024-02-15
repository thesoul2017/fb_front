import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import {endOfMonth, format, startOfMonth} from "date-fns";
import {HiArrowsPointingIn, HiArrowsPointingOut} from "react-icons/hi2";

const LineChart = ({data, period}) => {

    const [options, setOptions] = useState({});
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
                tension: 0.1
            },
            {
                label: 'Расходы',
                data: data.down,
                parsing: {
                    yAxisKey: 'total'
                },
                borderColor: '#eb4235',
                backgroundColor: '#eb4235',
                tension: 0.1
            }
        ]
    };

    useEffect(() => {
        if (period) {
            setOptions(options => (
                {
                    ...options,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
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
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
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
            <Line options={options} data={dataCharts}/>
        </div>
    );
};

export default LineChart;
