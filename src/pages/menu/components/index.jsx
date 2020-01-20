import { Form, Input, Select, Divider, Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

// @connect(({permission, loading}) => ({permission, loading}))
class MenuEditor extends Component {
  render() {
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
    const { values } = this.props;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        width={800}
        title="Basic Modal"
        visible={visible}
        onOk={onCreate}
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
            label="ID"
          >
            {getFieldDecorator('id', {
              initialValue: values.id,
            })(<Input placeholder="请输入" readOnly={true} />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="菜单父ID"
          >
            {getFieldDecorator('pid', {
              initialValue: values.pid == null ? '0' : values.pid,
            })(<Input placeholder="请输入" readOnly={true} />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="菜单Code"
          >
            {getFieldDecorator('code', {
              initialValue: values.code,
              rules: [
                {
                  required: true,
                  message: '请输入至少五个字符的规则描述！',
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
            label="菜单名称"
          >
            {getFieldDecorator('name', {
              initialValue: values.name,
              rules: [
                {
                  required: true,
                  message: '请输入至少五个字符的规则描述！',
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
            label="Icon"
          >
            {getFieldDecorator('Icon', {
              initialValue: values.icon,
            })(<Input placeholder="请输入" />)}
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="顺序"
          >
            {getFieldDecorator('sort', {
              initialValue: values.sort,
              rules: [
                {
                  required: true,
                  message: '请输入至少五个字符的规则描述！',
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
            label="菜单路径"
          >
            {getFieldDecorator('path', {
              initialValue: values.path,
              rules: [
                {
                  required: true,
                  message: '请输入至少五个字符的规则描述！',
                },
              ],
            })(<Input placeholder="Warning" id="warning" />)}
          </Form.Item>

          <Form.Item label="描述" hasFeedback help="Should be combination of numbers & alphabets">
            <TextArea rows={4} />
          </Form.Item>
          <Divider />

          {/*<Form.Item*/}
          {/*  labelCol={{*/}
          {/*    span: 5,*/}
          {/*  }}*/}
          {/*  wrapperCol={{*/}
          {/*    span: 15,*/}
          {/*  }}*/}
          {/*  label="权限"*/}
          {/*>*/}
          {/*  {getFieldDecorator('permis', {*/}
          {/*    initialValue: this.state.formVals.name,*/}
          {/*  })(<PermissionTree/>)}*/}
          {/*</Form.Item>*/}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'form_in_modal' })(MenuEditor);
