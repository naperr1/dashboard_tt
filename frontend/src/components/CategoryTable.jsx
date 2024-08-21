/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Table, Typography, Button, Popconfirm } from 'antd';
import EditableCell from './EditableCell';
import moment from 'moment';
import dayjs from 'dayjs';

const CategoryTable = ({ dataSource, columnsConfig, dropdownOptions, pageSize, scroll, onDelete, onEditSave }) => {

    const [bottom, setBottom] = useState('bottomCenter');

    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setData(dataSource);
    }, [dataSource, refresh]);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        const initialValues = columnsConfig.reduce((acc, col) => {
            if (col.inputType === 'date' && record[col.dataIndex]) {
                let parsedDate;

                if (moment(record[col.dataIndex], 'DD-MM-YYYY HH:mm:ss', true).isValid()) {
                    parsedDate = moment(record[col.dataIndex], 'DD-MM-YYYY HH:mm:ss');
                } else if (moment(record[col.dataIndex], 'DD/MM/YYYY', true).isValid()) {
                    parsedDate = moment(record[col.dataIndex], 'DD/MM/YYYY');
                } else if (moment(record[col.dataIndex], 'YYYY/MM/DD', true).isValid()) {
                    parsedDate = moment(record[col.dataIndex], 'YYYY/MM/DD');
                } else {
                    parsedDate = moment(record[col.dataIndex]);
                }

                acc[col.dataIndex] = parsedDate;
            } else {
                acc[col.dataIndex] = record[col.dataIndex];
            }
            return acc;
        }, {});

        form.setFieldsValue(initialValues);
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                const updatedRow = { ...item, ...row };

                columnsConfig.forEach((col) => {
                    if (col.inputType === 'date' && row[col.dataIndex]) {
                        updatedRow[col.dataIndex] = dayjs(row[col.dataIndex]).format('DD-MM-YYYY HH:mm:ss');
                    }
                });

                if (onEditSave) {
                    await onEditSave(updatedRow);
                    // setRefresh(prev => !prev);
                }

                newData.splice(index, 1, updatedRow);
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const handleDelete = (key) => {
        if (onDelete) {
            onDelete(key);
            setRefresh(prev => !prev);
        }
    };

    const mergedColumns = columnsConfig.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType || 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                form,
                dropdownOptions: dropdownOptions[col.dataIndex],
            }),
            align: 'center',
        };
    });

    mergedColumns.push({
        title: 'Hành động',
        dataIndex: 'operation',
        align: 'center',
        width: 180,
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span className='flex justify-center gap-3'>
                    <Typography.Link
                        onClick={() => save(record.key)}
                    >
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
            ) : (
                <div className="flex justify-center gap-3">
                    <Button
                        onClick={() => edit(record)} className="w-[72px] ml-2"
                    >
                        Edit
                    </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button className="w-[72px]">Delete</Button>
                    </Popconfirm>
                </div>
            );
        },
        fixed: 'right',
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                scroll={scroll}
                pagination={{
                    pageSize: pageSize || 2,
                    onChange: cancel,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    position: [bottom],
                }}
            />
        </Form>
    );
};

export default CategoryTable;

