import React, {useEffect} from 'react';

import './bingleBar.scss';

const colors = ["navy-bar", "purple-bar", "pink-bar", "red-bar", "yellow-bar"];

//Get all properties that rect needs
const SingleBar = ({x, y, width, height}) => {

    const getBarColor = (index) => {
        return colors[index];
    }

    return <rect
        x={x}
        y={y}
        width={width}
        height={height}/>

}

export default SingleBar;
