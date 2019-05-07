import React from 'react';
// antd component
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
// parser
import papaParse from 'papaparse';
// helpers
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import flattenDeep from 'lodash/flattenDeep';
// context types
import contextTypes from './contextTypes';

class UploadCSV extends React.Component {
    static contextTypes = contextTypes;

    state = {
        fileList: []
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const { fileList } = this.state;
        const { value: pValue } = this.context;
        const { value: nValue } = nextContext;

        if(isEmpty(nValue) && !isEmpty(pValue) && !isEmpty(fileList)){
            this.setState({fileList: []});
        }
    }

    onUploadFile = (file) => {
        this.setState(({fileList}) => ({
            fileList: [...fileList, file],
        }));

        papaParse.parse(file, {
            complete: (results) => {
                this.triggerChanges(remove(flattenDeep(results.data)), isEmpty)
            }});

        return false;
    };

    triggerChanges = (newData) => {
        const { handleValueChange, value: pValue } = this.context;

        if(!isEmpty(newData)){
            const value = pValue.concat(newData);
            handleValueChange(value);
        }
    };

    render() {
        const { fileList } = this.state;
        const { onUploadFile: beforeUpload } = this;

        const propsUpload = {
            fileList,
            beforeUpload,
            accept: '.csv',
            showUploadList: {
                showPreviewIcon: false,
                showRemoveIcon: false
            }
        };

        const propsBtn = {
            icon: 'upload',
            children: 'Upload devices using CSV'
        };

        return (
            <Upload {...propsUpload}>
                <Button {...propsBtn}/>
            </Upload>
        );
    }
}

export default UploadCSV;