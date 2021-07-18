import React from 'react';
import SingleBar from "./SingleBar";

import './barChart.scss';

const BarChart = () => {

    const data = [
        {name: "Tatooine", value: 200000},
        {name: "Alderan", value: 200000000},
        {name: "Naboo", value: 450000000},
        {name: "Bespin", value: 6000000},
        {name: "Endor", value: 30000000},
    ]

    return (
        <div className="BarChart">
            <h2>Planet Population</h2>
            <table className="table">
                <tbody>
                <tr className="bars">
                        {data.map((planet, i) => {
                            return <SingleBar key={i} index={i} {...planet}/>
                        })}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BarChart;