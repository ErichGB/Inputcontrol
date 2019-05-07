/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import classes from 'classnames/bind';
import PropTypes from 'prop-types';
// antd components
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import Select from 'antd/lib/select';
// helpers
import get from 'lodash/get';
import map from 'lodash/map';
import some from 'lodash/some';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
// components
import Head from './Head';
import BtnRemove from './BtnRemove';
// icons
import Broom from '!svg-react-loader?name=Broom!../../../../../../styles/icons/Broom.svg';
// styles
import styles from './styles.module.scss';

const LabelRequired = () => <span className='semibold text-warning mr-2'>Required</span>;

class RuleControl extends React.Component {
    static propTypes = {
        mode: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.object,
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.arrayOf(PropTypes.string)
        ]),
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onRemove: PropTypes.func,
        valueKey: PropTypes.string,
        labelKey: PropTypes.string,
        showSearch: PropTypes.bool,
        placeholder: PropTypes.string,
        initialValue: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.arrayOf(PropTypes.object)
        ])
    };

    static defaultProps = {
        mode: 'default',
        options: [],
        loading: false,
        valueKey: 'value',
        labelKey: 'label',
        showSearch: false,
        placeholder: 'Select your option',
        initialValue: {}
    };

    cx = classes.bind(styles);

    constructor(props) {
        super(props);
        const val = props.value || {};
        this.state = {
            options: [],
            value: val.value || [],
            included: val.included || true
        }
    }

    componentDidMount() {
        const { valueKey, labelKey, options: opts, initialValue } = this.props;

        if(some([opts, valueKey, labelKey], isEmpty)) return;

        const options = this.buildOptions(opts);

        this.setState({ options, ...initialValue });
    }

    buildOptions = (opts) => {
        const items = filter(opts, ({value, label}) => !some([value, label], isEmpty));

        return map(items, (item) => {
            const { valueKey, labelKey } = this.props;

            let value = '';
            let label = '';

            if(isString(item)){
                value = item;
                label = item;
            } else if(isObject(item)) {
                value = get(item, valueKey, '');
                label = get(item, labelKey, '');
            }

            const extra = isObject(item) ? item : {};

            return { ...extra, value, label };
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const { value: pValue, options: pOptions } = this.props;
        const { value: nValue, options: nOptions } = nextProps;

        if(!isEqual(pValue, nValue)) return this.setState({...nValue});
        if(!isEqual(pOptions, nOptions)) return this.setState({options: this.buildOptions(nOptions)});

    }

    handleIncludeChange = (included) => {
        this.setState({included}, this.triggerChange)
    };

    handleValueChange = (value) => {
        this.setState({value}, this.triggerChange);
    };

    triggerChange = () => {
        const { onChange } = this.props;
        const { value: val, included } = this.state;
        const value = isArray(val) ? val : [val];
        if(onChange) onChange({value, included});
    };

    onRemove = () => {
        const { code, onRemove } = this.props;
        onRemove(code);
    };

    render() {
        const { options, included, value } = this.state;
        const { required, title, loading, id, disabled, ...attr } = this.props;
        const { handleValueChange, handleIncludeChange, onRemove, cx } = this;

        const propsHead = { title, included, required, disabled, onChange: handleIncludeChange };

        const propsCard = {
            id,
            type: 'inner',
            title: <Head {...propsHead} />,
            extra: required ? <LabelRequired/> : <BtnRemove onClick={onRemove} />,
            className: cx('Rule')
        };

        const propsClearIcon = {
            onClick: () => handleValueChange([]),
            component: Broom
        };

        const filterOption = (input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

        const propsSelect = {
            ...attr,
            value,
            loading,
            disabled,
            filterOption,
            onChange: handleValueChange,
            className: cx('Select', { 'in': included }, { 'ex': !included }),
            clearIcon: <Icon {...propsClearIcon} />,
            allowClear: true,
            showSearch: true,
            getPopupContainer: () => document.getElementById(id)
        };

        return (
            <Card {...propsCard}>
                <Spin spinning={!!loading} >
                    <Select {...propsSelect}>
                        { map(options, (opt, key) => (
                            <Select.Option key={key} value={opt.value} >{opt.label}</Select.Option>
                        ))}
                    </Select>
                </Spin>
            </Card>
        );
    }
}

export default RuleControl;