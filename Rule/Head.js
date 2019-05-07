import React from 'react';
import classes from 'classnames';
// antd components
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';

const Head = (props) => {
    const { included, title, onChange, required, disabled } = props;

    const BtnIn = () => {
        const className = classes(
            'border-0',
            'shadow-none',
            { 'semibold': included },
            { 'text-success': included },
            { 'text-muted': !included }
        );

        const propsBtnIn = {
            disabled,
            className,
            type: included ? 'primary' : undefined,
            ghost: true,
            onClick: () => onChange(true),
            htmlType: 'button',
            children: 'Include',
        };

        return <Button {...propsBtnIn}/>
    };

    const BtnEx = () => {
        const className = classes(
            'border-0',
            'shadow-none',
            { 'semibold': !included },
            { 'text-muted': included }
        );

        const propsBtnEx = {
            disabled,
            className,
            type: included ? undefined : 'danger',
            ghost: true,
            onClick: () => onChange(false),
            htmlType: 'button',
            children: 'Exclude',
        };

        return <Button {...propsBtnEx}/>
    };

    const Title = () => {
        const propsTitle = {
            style: { minWidth: 90 },
            children: title,
            className: 'ml-1 mr-3 d-inline-block'
        };

        return <span {...propsTitle} />
    };

    return required
        ? <Title/>
        : <div style={{margin: '-4px 0'}}>
            <Title/>
            <BtnIn/>
            <Divider type='vertical' className='m-0'/>
            <BtnEx/>
          </div>
};

export default Head;