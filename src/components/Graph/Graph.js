import React from 'react';
import PropTypes from 'prop-types';
import Bar from "./Bar";
import BarTextContent from "./BarTextContent";
import BarTextValues from "./BarTextValues";

import './graph.scss';

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
                <BarTextValues data={data}/>
            </div>
        </div>
    );
};

Graph.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            fill: PropTypes.string,
        })
    ).isRequired,
};

export default Graph;