import React from 'react';
import PropTypes from 'prop-types';

import './appLoader.scss';

const AppLoader = ({loading}) => {
    return loading ? (
        <div className="AppLoader">
            <p>Loading...</p>
        </div>
    ) : null
};

export default AppLoader;

AppLoader.defaultProps = {
    loading: false
};

AppLoader.propTypes = {
    loading: PropTypes.bool
};