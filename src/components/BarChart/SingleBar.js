import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import './bingleBar.scss';

const SingleBar = ({x, y, width, height, fill}) => {

    return <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
    />

}

SingleBar.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default SingleBar;
