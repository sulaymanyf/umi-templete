import { Form, Input, Modal } from 'antd';
import React, { Component, Fragment } from 'react';

class TagEditor extends Component {
  render() {
    // console.log("this.props", this.props)
    const { values, roles, menus } = this.props;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
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
    const okHandle = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        onCreate(values);
      });
    };
    return (
      <Modal
        width={820}
        title="Basic Modal"
        visible={visible}
        onOk={okHandle}
        key={values.id}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="PID"
          >
            {getFieldDecorator('pid', {
              initialValue: values.pid,
            })(<Input placeholder="请输入" disabled={true} readOnly={true} />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="ID"
          >
            {getFieldDecorator('id', {
              initialValue: values.id,
            })(<Input placeholder="请输入" disabled={true} readOnly={true} />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="标签名称"
          >
            {getFieldDecorator('typeName', {
              initialValue: values.tagName,
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="标签颜色"
          >
            {getFieldDecorator('typeInfo', {
              initialValue: values.tagColor,
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'form_in_modal' })(TagEditor);
