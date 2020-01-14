import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Divider } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

class PermissionEditor extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
      <Form {...formItemLayout}>
        <Form.Item label="权限code">
          <Input
            placeholder="unavailable choice"
            id="error"
            value={'sdsada'}
            readOnly={true}
            disabled={true}
          />
        </Form.Item>

        <Form.Item label="权限名称" validateStatus="warning">
          <Input placeholder="Warning" id="warning" />
        </Form.Item>

        <Form.Item
          label="描述"
          hasFeedback
          validateStatus="error"
          help="Should be combination of numbers & alphabets"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Divider />

        <Form.Item label="Select[multiple]">
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              {children}
            </Select>,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(Form.create({ name: 'validate_other' })(PermissionEditor));
