import React from "react";
import PropTypes from 'prop-types';

const Chart = ({children, width, height}) => {

    return <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
    >
        {children}
    </svg>
}

export default Chart;

Chart.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};