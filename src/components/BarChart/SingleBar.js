import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import './bingleBar.scss';

const SingleBar = ({x, y, width, height, fill, name}) => {

    return (
        <g>
            <svg>
                {/*<text x={x} y={y} fill="red">{name}</text>*/}
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fill}
                />
                {/*<text x={x} y={y} fill="red"  textAnchor="middle">{height}</text>*/}
            </svg>
        </g>
    )
}

SingleBar.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default SingleBar;
