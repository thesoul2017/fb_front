import React, {useState} from 'react';
import {Doughnut} from "react-chartjs-2";
import {interpolateColors} from "../../utils/color";
import {HiArrowsPointingIn, HiArrowsPointingOut} from "react-icons/hi2";

const DoughnutChart = ({data}) => {

    const [options, setOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    });
    const [fullSize, setFullSize] = useState(false);

    const colors = interpolateColors(data.length);

    let dataCharts = {
        labels: data.map(item => item?.category?.name),
        datasets: [{
            label: 'Сумма',
            data: data,
            parsing: {
                key: 'total'
            },
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };

    return (
        <div className={fullSize ? "block chart-block doughnut full-size" : "block chart-block doughnut"}>
            <button className="resize" onClick={() => setFullSize(!fullSize)}>
                {fullSize ? <HiArrowsPointingIn/> : <HiArrowsPointingOut/>}
            </button>
            <Doughnut options={options} data={dataCharts}/>
        </div>
    );
};

export default DoughnutChart;
