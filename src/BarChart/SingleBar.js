import React from 'react';

import './bingleBar.scss';

const colors = ["navy-bar", "purple-bar", "pink-bar", "red-bar", "yellow-bar"];

const SingleBar = ({name, value, index}) => {

    const getBarColor = (index) => {
        return colors[index];
    }

    return (
        <td className="SingleBar">
            <span>{value}</span>
            <div className={getBarColor(index)}></div>
            <p className={getBarColor(index)}>{name}</p>
        </td>
    );
};

export default SingleBar;