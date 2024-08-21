/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { } from 'react';
import { Form, Input, InputNumber, ColorPicker, DatePicker, Select } from 'antd';
import moment from 'moment';
import { format, parse } from 'date-fns';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record = {},
    form,
    dropdownOptions = [],
    children,
    ...restProps
}) => {
    let inputNode;

    switch (inputType) {
        case 'number':
            inputNode = <InputNumber className='w-[80%]' />;
            break;

        case 'date':
            inputNode = (
                <DatePicker
                    className='w-[95%]'
                    showTime
                    format="DD/MM/YYYY HH:mm:ss"
                    value={form.getFieldValue(dataIndex) ? moment(form.getFieldValue(dataIndex), 'DD-MM-YYYY HH:mm:ss') : null}
                    onChange={(date) => form.setFieldsValue({ [dataIndex]: date })}
                />
            );
            break;

        case 'color':
            inputNode = (
                <ColorPicker
                    value={form.getFieldValue(dataIndex) || '#ffffff'}
                    onChange={(newColor) => {
                        const hexColor = newColor.toHex();
                        form.setFieldsValue({ [dataIndex]: `#${hexColor}` });
                    }}
                    className='flex justify-center w-[10%] mx-auto'
                />
            );
            break;

        case 'dropdown':
            inputNode = (
                <Select
                    value={form.getFieldValue(dataIndex)}
                    onChange={(value) => form.setFieldsValue({ [dataIndex]: value })}
                    style={{ width: '50%' }}
                >
                    {dropdownOptions.map(option => (
                        <Select.Option key={option} value={option}>
                            {option}
                        </Select.Option>
                    ))}
                </Select>
            );
            break;

        default:
            inputNode = <Input className='w-[80%]' />;
    }

    return (
        <td {...restProps} style={{ padding: '6px 16px', textAlign: 'center', ...restProps.style, }}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
