import React from 'react';
// antd component
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
// helpers
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// components
import Table from './Table';
import Query from '../../../../../../../graphQL/Query';
import Error from '../../../../../../../graphQL/Error';
import SkeletonTable from '../../../../../../../components/TableSkeleton';
// styles
import styles from '../styles.module.scss';
// context types
import contextTypes from "../contextTypes";

class CheckTable extends React.Component {
    static contextTypes = contextTypes;
    
    query = 'query ($devices: [String], $mode: String, $brand: [String]) { verifyDevices (devices: $devices, mode: $mode, brand: $brand) { device, status } }';

    state = {
        data: [],
        visible: false
    };

    showModal = () =>
        this.setState({visible: true});

    handleOk = () =>
        this.handleClose();

    handleClose = () =>
        this.setState({visible: false});

    onChange = (data) =>
        this.setState({visible: false, data}, () =>
            setTimeout(this.triggerChange, 350) );

    triggerChange = () => {
        const { data: value } = this.state;
        const { field, onChange } = this.props;

        if(onChange) {
            const devices = {
                ...field,
                value,
                errors: undefined
            };

            onChange({devices});
        }
    };

    render() {
        const { visible } = this.state;
        const { type: mode } = this.context;
        const { field: { value: devices }, helpText, disabled, payload } = this.props;
        const { showModal, query, handleOk : onOk, handleClose : onCancel, onChange } = this;

        const propsModal = {
            onOk,
            visible,
            onCancel,
            width: 640,
            title: 'Devices',
            footer: null,
            centered: true,
            className: styles.table,
            bodyStyle: {
                height: '50vh',
                padding: 0,
                overflow: 'hidden',
                minHeight: 400,
                maxHeight: 'calc(100vh - 200px)'
            },
            maskClosable: false,
            cancelButtonProps: { className: 'd-none' }
        };

        const propsQuery = {
            query,
            variables: { mode, devices, ...payload }
        };

        const propsBtnSelector = {
            icon: 'table',
            type: 'primary',
            ghost: true,
            onClick: showModal,
            htmlType: 'button',
            children: 'Verify Devices',
            disabled: disabled || isEmpty(devices),
            className: 'mt-3',
        };

        return (
            <div>
                <Button {...propsBtnSelector} />
                { helpText && <span className='text-muted ml-3' >{helpText}</span> }

                <Divider dashed className='my-3' />

                <Modal {...propsModal} >
                    <Query {...propsQuery} >
                        { ({ data, loading, errors }) => {
                            if (loading) return <SkeletonTable cols={3} rows={17} />;
                            if (errors) return <Error errors={errors} /> ;

                            const dataSource = get(data, 'verifyDevices', []);
                            const propsTable = { dataSource, onChange };

                            return <Table {...propsTable} />;
                        }}
                    </Query>
                </Modal>
            </div>
        );
    }
}

export default CheckTable;