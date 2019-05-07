import React from 'react';
import classes from 'classnames/bind';
// antd components
import Button from 'antd/lib/button';
// helpers
import isEmpty from 'lodash/isEmpty';
// context types
import contextTypes from './contextTypes';
// styles
import styles from './styles.module.scss';

const BtnClear = (props, context) => {
    const { className, ...attr } = props;
    const { value, disabled, handleValueChange } = context;

    const cx = classes.bind(styles);
    
    const onClick = () => handleValueChange('');

    const propsBtn = {
        ...attr,
        onClick,
        type: 'danger',
        icon: 'close-circle',
        ghost: true,
        title: 'clear',
        children: 'Clear',
        disabled: disabled || isEmpty(value),
        className: cx('BtnClear', className)
    };

    return (
        <Button {...propsBtn}/>
    );
};

BtnClear.contextTypes = contextTypes;

export default BtnClear;