import {Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Divider, Modal, FormItem} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

@connect(({permission, loading}) => ({permission, loading}))
class PermissionEditor extends Component {

  constructor(props) {
    super(props);
    console.log(" super(props)",props)
    this.state = {
      formVals: {
        name: props.values.menuName,
        id: props.values.id,
        type: props.values.type,
        description: props.values.description,
        url: props.values.url,


      },
      currentStep: 0,
    };

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

    const { options } =this.props.permission
    const children = [];
    for (var opp in options.data) {
      for (let op in opp){
        console.log(options.data[opp].id)
        console.log(options.data[opp].perName)
        children.push(<Option key={options.data[opp].id}>{options.data[opp].perName}</Option>);
      }
    }
    // for (let i = 10; i < 36; i++) {
    //   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    // }

    return (
      <Form {...formItemLayout}>
        <Form.Item
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="权限code"
        >
          {getFieldDecorator('code', {
            initialValue: this.state.formVals.url,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入"   readOnly={true}
                    disabled={true}/>)}
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="权限名称"
        >
          {getFieldDecorator('name', {
            initialValue: this.state.formVals.name,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入"/>)}
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="Title"
        >
          {getFieldDecorator('title', {
            initialValue: this.state.formVals.name,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入"/>)}
        </Form.Item>


        <Form.Item label="权限code">
          <Input
            placeholder="unavailable choice"
            id="error"
            value={'sdsada'}

          />
        </Form.Item>
        <Form.Item
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="Title"
        >
          {getFieldDecorator('title', {
            initialValue: this.state.formVals.name,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入"/>)}
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
