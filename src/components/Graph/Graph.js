import React from 'react';
import PropTypes from 'prop-types';
import Bar from "./Bar";

import './graph.scss';

const Graph = ({data, title}) => {

    const renderBars = () => {
        let sumOfAllValues = data.reduce((sum, current) => sum + current.value, 0);

        return data.map(data => {
            const percent = (data.value / sumOfAllValues) * 100;
            return (
                <Bar
                    text={data.name}
                    value={data.value}
                    percent={percent}
                    key={data.name}/>
            )
        })
    }
    return (
            <dl className="Graph">
                <dt>{title}</dt>
                    {renderBars()}
            </dl>
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