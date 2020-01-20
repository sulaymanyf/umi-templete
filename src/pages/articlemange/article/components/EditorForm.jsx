import { Form, Input, Modal, Cascader, Upload, message, Button, Icon, Select } from 'antd';
import React, { Component, useEffect, useState } from 'react';

// class PriceInput extends React.Component {
//   handleNumberChange = e => {
//     const number = parseInt(e.target.value || 0, 10);
//     if (isNaN(number)) {
//       return;
//     }
//     this.triggerChange({number});
//   };
//
//   handleCurrencyChange = currency => {
//     this.triggerChange({currency});
//   };
//
//   triggerChange = changedValue => {
//     const {onChange, value} = this.props;
//     if (onChange) {
//       onChange({
//         ...value,
//         ...changedValue,
//       });
//     }
//   };
//
//   render() {
//     const {size, value} = this.props;
//     return (
//       <span>
//         <Input
//           type="text"
//           size={size}
//           value={value.number}
//           onChange={this.handleNumberChange}
//           style={{width: '65%', marginRight: '3%'}}
//         />
//         <Select
//           value={value.currency}
//           size={size}
//           style={{width: '32%'}}
//           onChange={this.handleCurrencyChange}
//         >
//           <Option value="try">TRY</Option>
//         </Select>
//       </span>
//     );
//   }
// }

const FormItem = Form.Item;

//return fetch(`https://api.spotify.com/v1/me`, {
//     headers: { Authentication: `Bearer ${accessToken}` }
//   })
//     .then(response => response.json())
//     .then(jsonResponse => {
//       userId = jsonResponse.id;
//       console.log(userId);
//       return userId;
//     });
class EditorForm extends Component {
  static defaultProps = {
    values: {},
  };

  constructor(props) {
    super(props);
    console.log(' super(props)', props);
    this.state = {
      fileList: [{ uid: props.values.id, name: props.values.title }],
      formVals: {
        title: props.values.title,
        id: props.values.id,
        userId: props.values.userId,
        userName: props.values.userName,
        status: props.values.status,
        metinType: props.values.metinType,
        typeName: props.values.typeName,
        mark: props.values.mark,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };
  }

  beforeUpload = file => {
    if (count > 1) {
      message.error('one file');
      return;
    }
    //application/vnd.openxmlformats-officedocument.wordprocessingml.document  application/pdf
    const isJpgOrPng =
      file.type === 'application/msword' ||
      file.type === 'text/plain' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!isJpgOrPng) {
      message.error('You can only upload doc/docx/text file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('file must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setCount(count + 1);
    }

    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    const { status, response } = info.file;
    if (status !== 'uploading') {
    }
    console.log('status', status);
    if (status == 'removed') {
      this.setState({
        fileList: [],
      });
    }

    if (status === 'done') {
      form.setFieldsValue({ file: response });
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  onChange(value) {
    value = value[0];
    form.setFieldsValue({ type: value });
  }

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  beforeUpload(file) {
    if (count > 1) {
      message.error('one file');
      return;
    }
    //application/vnd.openxmlformats-officedocument.wordprocessingml.document  application/pdf
    const isJpgOrPng =
      file.type === 'application/msword' ||
      file.type === 'text/plain' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!isJpgOrPng) {
      message.error('You can only upload doc/docx/text file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('file must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setCount(count + 1);
    }

    return isJpgOrPng && isLt2M;
  }

  andleChange = info => {
    const { status, response } = info.file;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      form.setFieldsValue({ file: response });
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { editorModalVisible, onCancel: handleEditorModalVisible, values } = this.props;
    const { formVals: oldValue } = this.state;
    const { form } = this.props;
    const formVals = { ...oldValue };
    console.log('formVals', formVals);
    return (
      <Modal
        destroyOnClose
        title=" Ekle"
        visible={editorModalVisible}
        // onOk={okHandle}
        onCancel={() => handleEditorModalVisible(false, values)}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="Title"
        >
          {form.getFieldDecorator('title', {
            initialValue: formVals.title,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="Type"
        >
          {form.getFieldDecorator('type', {
            initialValue: formVals.typeName,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
              },
            ],
          })(
            <Cascader
              options={this.state.options}
              onChange={this.onChange}
              placeholder="Please select"
            />,
          )}
        </FormItem>
        {/*<FormItem*/}
        {/*  labelCol={{*/}
        {/*    span: 5,*/}
        {/*  }}*/}
        {/*  wrapperCol={{*/}
        {/*    span: 15,*/}
        {/*  }}*/}
        {/*  label="Price"*/}
        {/*>*/}
        {/*  {form.getFieldDecorator('price', {*/}
        {/*    initialValue: {number: 0, currency: 'TRY'},*/}
        {/*    rules: [{required: true, validator: this.checkPrice}],*/}
        {/*  })(<PriceInput/>)}*/}
        {/*</FormItem>*/}
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="note"
        >
          {form.getFieldDecorator('note', {
            initialValue: formVals.mark,

            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5,
              },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="File"
        >
          {form.getFieldDecorator('file', {
            initialValue: formVals.defaultFileList,
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
              },
            ],
          })(
            <Upload
              action="api/ceviri-kizlar/v1/fileUpload"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              fileList={this.state.fileList}
            >
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>,
          )}
        </FormItem>
      </Modal>
    );
  }
}

// export default connect(({ metin }) => ({ metin }))(CreateForm);
export default Form.create()(EditorForm);
