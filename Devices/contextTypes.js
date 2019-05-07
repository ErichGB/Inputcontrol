import PropTypes from 'prop-types';

const contextTypes = {
    type: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    handleValueChange: PropTypes.func
};

export default contextTypes;