import { } from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const DatePickerVoucher = () => (
  <div className="flex flex-col gap-2 border border-gray-400 pt-2 pb-3 px-4 rounded-lg">
    <h2 className="text-xl font-semibold cursor-default">Thời hạn sử dụng</h2>
    <Space direction="vertical" size={12} className='mx-auto'>
      <RangePicker size='large' />
    </Space>
  </div>
);
export default DatePickerVoucher;