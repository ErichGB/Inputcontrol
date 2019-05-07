import React from 'react';
// andt component
import Tag from 'antd/lib/tag';
// helpers
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

const color = {
    "Duplicated": 'red',
    "Black List": '#353535',
    "In other campaign": 'orange'
};

const columns = [
    {
        key: 'device',
        width: '30%',
        title: 'Device',
        dataIndex: 'device'
    },
    {
        key: 'status',
        width: '60%',
        title: 'Status',
        dataIndex: 'status',
        render: errors => (
            <span className='small'>
                { isEmpty(errors)
                    ? <Tag color='green' >VALID</Tag>
                    : map(errors, (error, key) =>
                       <Tag color={color[error]} key={key}>{error.toUpperCase()}</Tag>)
                }
            </span>
        )
    }
];

export default columns;