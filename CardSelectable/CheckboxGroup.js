import React from 'react';
import PropTypes from 'prop-types';
// helpers
// import map from 'lodash/map';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
// components
import CardSelectable from './CardSelectable';

class CheckboxGroup extends React.Component {
    static defaultProps = {
        options: []
    };

    static propTypes = {
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        options: PropTypes.array.isRequired,
        onChange: PropTypes.func,
    };

    static childContextTypes = {
        checkboxGroup: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || [],
        };
    }

    getChildContext() {
        return {
            checkboxGroup: {
                value: this.state.value,
                disabled: this.props.disabled,
                toggleOption: this.toggleOption,
            },
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!isEqual(nextProps.value, this.props.value))
            this.setState({value: nextProps.value});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
    }

    toggleOption = (optionValue) => {
        const optionIndex = this.state.value.indexOf(optionValue);
        const value = [...this.state.value];

        if (optionIndex === -1) {
            value.push(optionValue);
        } else {
            value.splice(optionIndex, 1);
        }

        if (!('value' in this.props)) {
            this.setState({ value });
        }

        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    };

    renderGroup = () => {
        const { props, state } = this;
        const { options } = props;

        let { children } = props;

        if (options && options.length > 0) {
            children = options.map(option => (
                <CardSelectable
                    {...option}
                    key={option.value.toString()}
                    checked={state.value.indexOf(option.value) !== -1}
                    disabled={'disabled' in option ? option.disabled : props.disabled}>
                    {option.children}
                </CardSelectable>
            ));
        }

        return children;
    };

    render() {
        const domProps = omit(this.props, ['options', 'children', 'defaultValue', 'value', 'onChange', 'disabled']);

        return (
            <div {...domProps}>
                {this.renderGroup()}
            </div>
        );
    }
}

export default CheckboxGroup;