import React from 'react';

const BarTextValue = ({data}) => {
    return (
        <div className="bar-text-values">
            {
                data.map(({name, value}) => (
                    <div key={name} className="text">
                        {value}
                    </div>
                ))
            }
        </div>
    );
};

export default BarTextValue;