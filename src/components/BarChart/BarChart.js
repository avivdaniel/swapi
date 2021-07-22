import React from 'react';
import PropTypes from 'prop-types';
import Chart from "./Chart";
import SingleBar from "./SingleBar";

const DEFAULT_COLOR = '#000000';

const BarChart = ({data, barWidth, barMargin, normalize}) => {
    const width = data.length * (barWidth + barMargin);

    const normalizeData = data.map(item => {
            return {
                ...item,
                value: item.value * normalize
            }
        }
    )

    const mostPopulations = normalizeData.reduce((acc, cur) => {
        const {value} = cur
        return value > acc ? value : acc
    }, 0)

    const chartHeight = mostPopulations;

    return (
        <Chart
            height={chartHeight}
            width={width}
        >
            {normalizeData.map((item, index) => {
                const itemHeight = item.value;
                const color = item?.fill ? item.fill : DEFAULT_COLOR
                return <SingleBar
                    fill={color}
                    key={item.name}
                    x={index * (barWidth + barMargin)}
                    y={chartHeight - itemHeight}
                    width={barWidth}
                    height={itemHeight}
                />
            })}

        </Chart>
    )
}

export default BarChart;

BarChart.defaultProps = {
barWidth: 50,
barMargin: 10,
normalize: 0.25
}

BarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        fill: PropTypes.string,
        })
    ).isRequired,
    barWidth: PropTypes.number,
    barMargin: PropTypes.number,
    normalize: PropTypes.number,
};