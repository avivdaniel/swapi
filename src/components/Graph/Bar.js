import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({percent, text, value}) => {
    const integerPercent = Math.ceil(percent);
    const percentClassName =  `percentage-${integerPercent}`
    return (
        <dd className={`bar percentage ${percentClassName}`}>
            <span className="text">
                {text}
                <span className="value">{value}</span>
            </span>
        </dd>
    );
};

Bar.propTypes = {
    percent: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default Bar;