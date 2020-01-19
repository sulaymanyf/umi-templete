import { Form, Input, Modal, Cascader, Upload, message, Button, Icon,Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { number } from 'prop-types';
import {connect} from "dva";

const { Option } = Select;

class PriceInput extends React.Component {
  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={value.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={value.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="try">TRY</Option>
        </Select>
      </span>
    );
  }
}
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

function CreateForm (props) {

  //   function CreateForm({ metin, dispatch ,props}) {
  const { modalVisible, form, onSubmit: handleAdd, onCancel } = props;
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(1);
  const {
    dispatch,

  } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'metin/getTree',
        callback: (res) => {
          if (res) {
            console.log(res.data);// 请求完成后返回的结果
            setOptions(res.data)
          }
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   this.props.dispatch({
  //     type: 'metin/getTree'
  //   });
  //   fetch('api/ceviri-kizlar/metinTypeTree/v1/metinTypeTree')
  //     .then(res => res.json())
  //     .then(ress => {
  //       console.log(options.length === 0);
  //       // setOptions(ress.data)
  //       if (options.length === 0) {
  //         setOptions(ress.data);
  //       }
  //     });
  // });



  // {
  //   console.log(data.json())
  //   // rres=data.json();
  //   data.json().then((v)=>{
  //     console.log(v.data)
  //     rres=v.data
  //   })
  // }
  console.log(options);
  // res.then(v=>{
  //   setOptions(v.data)
  // })
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  function onChange(value) {
    value = value[0];
    form.setFieldsValue({ type: value });
    console.log();
  }

  // const options = [
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     children: [
  //       {
  //         value: 'hangzhou',
  //         label: 'Hangzhou',
  //         children: [
  //           {
  //             value: 'xihu',
  //             label: 'West Lake',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     children: [
  //       {
  //         value: 'nanjing',
  //         label: 'Nanjing',
  //         children: [
  //           {
  //             value: 'zhonghuamen',
  //             label: 'Zhong Hua Men',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  function beforeUpload(file) {
    console.log(file.type);
    console.log(file.type === 'application/pdf');
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
    console.log(file.size);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('file must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setCount(count + 1);
    }
    console.log(count);

    return isJpgOrPng && isLt2M;
  }
  const handleChange = info => {
    const { status, response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(response);
      form.setFieldsValue({ file: response });
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  return (
    <Modal
      destroyOnClose
      title="Yeni Ekle"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
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
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
            },
          ],
        })(<Cascader options={options} onChange={onChange} placeholder="Please select" />)}
      </FormItem>
      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="Price"
      >
        {form.getFieldDecorator('price', {
          initialValue: { number: 0, currency: 'TRY' },
          rules: [{ required: true,validator: checkPrice }],
        })(<PriceInput />)}
      </FormItem>
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
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
            },
          ],
        })(
          <Upload
            action="api/ceviri-kizlar/file/v1/file/fileUpload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>,
        )}
      </FormItem>
    </Modal>
  );
};
export default connect(({ metin,props }) => ({ metin ,props}))(Form.create()(CreateForm));
// export default Form.create()(CreateForm);
