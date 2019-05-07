import React from 'react';
// antd components
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';

const Helper = (props) => (
    <div>
        <Divider dashed className='mt-3 mb-0' />
        <p className='text-muted mb-1'>
            <Icon type="info-circle" className='align-text-bottom' />
            <small className='ml-2'>{props.msg}</small>
        </p>
        <Divider dashed className='mb-3 mt-0' />
    </div>
);

export default Helper;