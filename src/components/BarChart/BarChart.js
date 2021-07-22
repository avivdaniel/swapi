import React from 'react';
import Chart from "./Chart";
import SingleBar from "./SingleBar";

const BarChart = ({data}) => {

//width of each part  - we can make it with props later
    const barWidth = 80;
    const barMargin = 10;
    // the chart width
    const width = data.length * (barWidth + barMargin);


    // Normalize data, we'll reduce all sizes to 25% of their original value
    const massagedData = data.map(planet => {
            return {
                ...planet,
                value: planet.value * 0.0000008
            }
        }
    )

    const mostPopulations = massagedData.reduce((acc, cur) => {
        const {value} = cur
        return value > acc ? value : acc
    }, 0)

    const chartHeight = mostPopulations;


    return (
        <Chart
            height={chartHeight}
            width={width}
        >
            {massagedData.map((planet, index) => {
                const planetHeight = planet.value;
                return <SingleBar
                    key={planet.name}
                    x={index * (barWidth + barMargin)}
                    y={chartHeight - planetHeight}
                    width={barWidth}
                    height={planetHeight}
                />
            })}

        </Chart>
    )
    //The height of the chart will be the the greates value of the y axis

}

export default BarChart;