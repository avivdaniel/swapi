import React from 'react';

const BarTextContent = ({data}) => {
    return (
        <div className="bar-text-content">
            {
                data.map(({name}) => (
                 <div key={name} className="text">
                     {name}
                 </div>
                ))
            }
        </div>
    );
};

export default BarTextContent;