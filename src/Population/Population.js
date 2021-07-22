import React from 'react';
import BarChart from "../components/BarChart/BarChart";

const Population = () => {

    const data = [
        {name: 'Tatooine', value: 200000, fill: '#58508d'},
        {name: 'Alderan', value: 200000000, fill: '#bc5090'},
        {name: 'Naboo', value: 450000000, fill: '#ff6361'},
        {name: 'Bespin', value: 6000000, fill: '#ffa600'},
        {name: 'Endor', value: 30000000, fill: '#003f5c'},
    ]

    return <BarChart data={data} normalize={0.0000008}/>
};

export default Population;