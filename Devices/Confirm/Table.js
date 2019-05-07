import React from 'react';
// antd component
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
// helpers
import map from 'lodash/map';
import size from 'lodash/size';
import pullAt from 'lodash/pullAt';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
// cols setting
import columns from './colsSetting';
// styles
import styles from "../styles.module.scss";

class TableDevices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        const { dataSource: data } = this.props;

        const dataSource = map(data, (item, key) => ({...item, key}));
        const defaultSelected = filter(dataSource, ({status}) => isEmpty(status));
        const selectedRowKeys = map(defaultSelected, 'key');

        this.setState({ dataSource, selectedRowKeys });
    }

    onChangeSelection = (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedRowKeys});
    };

    triggerChange = () => {
        const { selectedRowKeys, dataSource } = this.state;
        // const selectedRow = filter(dataSource, ({key}) => includes(selectedRowKeys, key));
        // const selection = map(selectedRow, 'device');
        const selection = map(pullAt(cloneDeep(dataSource), selectedRowKeys), 'device');
        this.props.onChange(selection);
    };

    render() {
        const { dataSource, selectedRowKeys } = this.state;
        const { onChangeSelection: onChange, triggerChange } = this;

        const propsBtnVerify = {
            // icon: 'check',
            type: 'primary',
            ghost: true,
            onClick: triggerChange,
            children: <b>Add</b>
        };

        const title = () => (
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='text-truncate'>
                        <b>{size(selectedRowKeys)}</b> / <b>{size(dataSource)}</b> <span>Devices</span>
                    </span>
                    <Button {...propsBtnVerify} />
                </div>
            );

        const rowSelection = { onChange, selectedRowKeys };

        const propsTable = {
            title,
            columns,
            dataSource,
            rowSelection,
            size: 'middle',
            scroll: { x: true, y: 240 },
            className: styles.table,
            pagination: false
        };

        return (
            <Table {...propsTable} />
        );
    }
}

export default TableDevices;