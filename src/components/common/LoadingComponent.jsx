import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({inverted, content}) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
};

LoadingComponent.propTypes = {
    inverted: PropTypes.bool,
    content: PropTypes.string.isRequired
};

LoadingComponent.defaultProps = {
    inverted: false
};

export default LoadingComponent;
