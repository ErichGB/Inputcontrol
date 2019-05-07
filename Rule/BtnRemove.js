import React from 'react';
import classes from 'classnames';
// antd component
import Button from 'antd/lib/button';

const BtnRemove = (props) => {
    const { onClick } = props;
    
    const propsBtnReset = {
        onClick,
        type: 'danger',
        icon: 'close-circle',
        ghost: true,
        shape: 'circle',
        title: 'Remove Rule',
        style: {
            lineHeight: 0,
            margin: '-6px 0'
        },
        htmlType: 'button',
        className: classes('border-0', 'shadow-none')
    };

    return <Button {...propsBtnReset}/>
};

export default BtnRemove;