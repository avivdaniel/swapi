import React from 'react';
import PropTypes from 'prop-types';

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

BarTextContent.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            fill: PropTypes.string,
        })
    ).isRequired,
};

export default BarTextContent;