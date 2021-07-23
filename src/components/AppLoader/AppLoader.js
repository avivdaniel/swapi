import React from 'react';
import PropTypes from 'prop-types';
import loader from '../../assets/preloader.gif';

import './appLoader.scss';

const AppLoader = ({loading}) => {
    return loading ? (
        <div className="AppLoader">
            <div className="content">
                <img src={loader}/>
                <p>Loading...</p>
            </div>
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