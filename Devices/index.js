import React from 'react';
import classes from 'classnames/bind';
import PropTypes from 'prop-types';
// antd components
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Divider from 'antd/lib/divider';
// helpers
import head from 'lodash/head';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import toString from 'lodash/toString';
import papaParse from 'papaparse';
// component
import Helper from './Helper';
import BtnClear from './BtnClear';
import BtnUpCSV from './BtnUpCSV';
// context types
import contextTypes from './contextTypes';
// styles
import styles from './styles.module.scss';

class DeviceControl extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        help: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        value: PropTypes.arrayOf(PropTypes.string),
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        allowFile: PropTypes.bool,
        allowClear: PropTypes.bool,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        type: 'imeis',
        title: null,
        extra: null,
        allowFile: true,
        allowClear: true,
        placeholder: 'Start typing to add devices',
    };

    static childContextTypes = contextTypes;

    cx = classes.bind(styles);

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || [],
        }
    }

    getChildContext() {
        return {
            type: this.props.type,
            value: this.state.value,
            disabled: this.props.disabled,
            handleValueChange: this.handleValueChange,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { value: nValue } = nextProps;
        const { value: pValue } = this.props;

        if(!isEqual(nValue, pValue))
            this.setState({value: nValue});
    }

    handleValueChange = (val) => {
        if(isEmpty(val)){
            const { value } = this.state;
            if(!isEmpty(value)) this.setValue([]);
        }else {
            const value = isArray(val) ? val : head(papaParse.parse(toString(val)).data);
            this.setValue(value);
        }
    };

    setValue = (value) => {
        this.setState({value}, this.triggerChange);
    };

    triggerChange = () => {
        const { value } = this.state;
        const { onChange } = this.props;

        if(onChange) onChange(value);
    };

    render() {
        const { value } = this.state;
        const { handleValueChange } = this;
        const { allowClear, placeholder, help, allowFile, disabled, ...attr } = this.props;

        const propsTextArea = {
            value,
            disabled,
            placeholder,
            autosize: { minRows: 5, maxRows: 10 },
            onChange: ({target}) => handleValueChange(target.value),
            className: 'border-0 bg-light'
        };

        const propsCard = {
            ...omit(attr, ['onChange']),
            type: 'inner',
            bodyStyle: attr.bodyStyle ? attr.bodyStyle : { padding: '1rem' },
            className: this.cx('InputControlDevice', attr.className),
        };

        return (
            <Card {...propsCard} >
                <Input.TextArea {...propsTextArea} />

                { isEmpty(help)
                    ? <Divider dashed className='my-3' />
                    : isString(help) ? <Helper msg={help} /> : help
                }

                <div className='position-relative' >
                    { allowFile && <BtnUpCSV/> }
                    { allowClear && <BtnClear/> }
                </div>
            </Card>
        );
    }
}

export default DeviceControl;