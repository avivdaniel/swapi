import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({percent}) => {
    return (
        <div className="bar" style={{width: `${percent}%`}}>

        </div>
    );
};

Bar.propTypes = {
    percent: PropTypes.number.isRequired
};

export default Bar;