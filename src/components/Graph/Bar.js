import React from 'react';

const Bar = ({percent}) => {
    return (
        <div className="bar" style={{width: `${percent}%`}}>

        </div>
    );
};

export default Bar;