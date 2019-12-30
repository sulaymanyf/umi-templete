import { Button, DatePicker, Form, Input, message, Modal, Radio, Select, Steps } from 'antd';
import React, { Component } from 'react';
import Editor from '@/pages/articlemange/article/components/SingleArticle';
import BraftEditor from 'braft-editor';
import FileViewer from 'react-file-viewer';
import Ceeditor from "@/pages/articlemange/article/components/Ceeditor";
import TinyEdiot from "@/pages/articlemange/article/components/TinyEdiot";

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

class UpdateForm extends Component {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  constructor(props) {
    console.log('props');
    console.log(props);
    console.log('props');

    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(props.values.content),
      fileId: props.values.content,
      formVals: {
        id: props.values.id,
        userId: props.values.userId,
        username: props.values.username,
        title: props.values.title,

        fileType: props.values.fileType,
        typeName: props.values.typeName,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };
  }
  handleNext = currentStep => {
    const { form, onSubmit: handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        },
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    const { editorState } = this.state;
    const controls = [];
    if (currentStep === 1) {
      return [<BraftEditor controls={controls} value={editorState} readOnly="true" />];
    }

    const { fileId, content } = this.state;
    return [
      <FormItem key="name" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入规则名称！',
            },
          ],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="规则描述">
        {form.getFieldDecorator('desc', {
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 5,
            },
          ],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>,
      <TinyEdiot id={fileId}/>


    ];
  };
  // {/*<FileViewer fileType={'docx'} filePath={'api/ceviri-kizlar/v1/file/' + fileId} />,*/}
  // <Ceeditor id={fileId}/>
  // <Editor id={fileId}/>

  renderFooter = currentStep => {
    const { onCancel: handleUpdateModalVisible, values } = this.props;

    if (currentStep === 1) {
      return [
        <Button
          key="back"
          style={{
            float: 'left',
          }}
          onClick={this.backward}
        >
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }

    if (currentStep === 2) {
      return [
        <Button
          key="back"
          style={{
            float: 'left',
          }}
          onClick={this.backward}
        >
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }

    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;
    return (
      <Modal
        width={840}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps
          style={{
            marginBottom: 28,
          }}
          size="small"
          current={currentStep}
        >
          <Step title="基本信息" />
          <Step title="配置规则属性" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create()(UpdateForm);
