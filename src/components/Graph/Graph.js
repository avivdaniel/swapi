import React from 'react';
import BarTextContent from "./BarTextContent";
import Bar from "./Bar";
import './graph.scss';
import BarTextValue from "./BarTextValues";

const Graph = ({data}) => {

    const renderBars = () => {
        let sumOfAllValues = data.reduce((sum, current) => sum + current.value, 0);

        return data.map(data => {
            const percent = (data.value / sumOfAllValues) * 100;
            return (
                <Bar
                    percent={percent}
                    key={data.name}/>
            )
        })
    }
    return (
        <div className="graph-wrapper">
            <div className="graph">
                <BarTextContent data={data}/>
                <div className="bar-container">
                    {renderBars()}
                </div>
                <BarTextValue data={data}/>
            </div>
        </div>
    );
};

export default Graph;