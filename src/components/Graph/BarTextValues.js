import React from 'react';
import PropTypes from 'prop-types';

const BarTextValues = ({data}) => {
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

BarTextValues.propTypes = {
        data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            fill: PropTypes.string,
        })
    ).isRequired,
};

export default BarTextValues;
