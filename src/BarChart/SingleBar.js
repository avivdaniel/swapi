import React from 'react';

import './bingleBar.scss';

const SingleBar = ({name, value}) => {
    return (
        <td className="SingleBar">
            <span>{value}</span>
            <div></div>
            <p>{name}</p>
        </td>
    );
};

export default SingleBar;