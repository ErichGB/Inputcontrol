import React from 'react';
import PropTypes from 'prop-types';
// helpers
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
// components
import CardSelectable from './CardSelectable';

const getCheckedValue = (children) => {
    let value = null;
    let matched = false;

    React.Children.forEach(children, (radio) => {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });

    return matched ? value : undefined;
};

class RadioGroup extends React.Component {
    static defaultProps = {
        disabled: false
    };

    static childContextTypes = {
        radioGroup: PropTypes.any
    };

    constructor(props) {
        super(props);
        let value;

        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = getCheckedValue(props.children);
        }

        this.state = { value };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!isEqual(this.props.value, nextProps.value)) {
            const value = ('value' in nextProps) ? nextProps.value : getCheckedValue(nextProps.children);
            this.setState({value});
        }
    }

    getChildContext() {
        return {
            radioGroup: {
                name: this.props.name,
                value: this.state.value,
                onChange: this.onRadioChange,
                disabled: this.props.disabled
            },
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
    }

    onRadioChange = (value) => {
        const { value: lastValue } = this.state;

        if (!('value' in this.props)) {
            this.setState({ value });
        }

        const { onChange } = this.props;
        if (onChange && value !== lastValue) {
            onChange(value);
        }
    };

    renderGroup = () => {
        const { options, disabled } = this.props;
        const { value } = this.state;

        let { children } = this.props;

        if (options && options.length > 0) {
            children = options.map((option) =>(
                <CardSelectable
                    {...option}
                    key={option.value.toString()}
                    checked={isEqual(option.value, value)}
                    disabled={'disabled' in option ? option.disabled : disabled}>
                    {option.children}
                </CardSelectable>
            ));
        }

        return children;
    };


    render() {
        const domProps = omit(this.props, ['options', 'children', 'defaultValue', 'value', 'onChange', 'disabled']);

        return (
            <div {...domProps} >
                {this.renderGroup()}
            </div>
        );
    }
}

export default RadioGroup;