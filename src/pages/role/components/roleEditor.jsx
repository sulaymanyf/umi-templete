import { Form, Input, DatePicker, TimePicker, Select, Cascader, Checkbox, Divider } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;
const {} = Checkbox;

class RoleEditor extends Component {
  onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

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
    const plainOptions = ['Apple', 'Pear', 'Orange', '但是', '撒大', '撒旦撒'];
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: '但是', value: '打撒大' },
      { label: '达式', value: '的撒' },
    ];

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

        <Form.Item label="拥有权限">
          <div style={{ width: 550 }}>
            <span style={{ marginRight: 8 }}>Categories:</span>
            <Checkbox.Group
              options={plainOptions}
              defaultValue={['Apple']}
              onChange={this.onChange}
            />
            <span style={{ marginRight: 8 }}>Categories:</span>
            <Checkbox.Group
              options={plainOptions}
              defaultValue={['Apple']}
              onChange={this.onChange}
            />
            <span style={{ marginRight: 8 }}>Categories:</span>
            <Checkbox.Group
              options={plainOptions}
              defaultValue={['Apple']}
              onChange={this.onChange}
            />
            <span style={{ marginRight: 8 }}>Categories:</span>
            <Checkbox.Group
              options={plainOptions}
              defaultValue={['Apple']}
              onChange={this.onChange}
            />
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(Form.create({ name: 'validate_other' })(RoleEditor));
