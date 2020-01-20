import { Button, Modal, Form, Input, Radio } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Collection
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

// import {TreeSelect} from 'antd';
// import React, {Component} from "react";
// import {connect} from "dva";
//
// const {SHOW_PARENT} = TreeSelect;
//
// @connect(({permission, loading}) => ({permission, loading}))
// class PermissionTree extends Component {
//   state = {
//     value: ['0-0-0'],
//   };
//
//   componentDidMount() {
//     const {dispatch} = this.props;
//     dispatch({
//       type: 'permission/getTree',
//     });
//   }
//
//
//   onChange = value => {
//     console.log('onChange ', value);
//     this.setState({value});
//   };
//
//   render() {
//     const {permissionTree} = this.props.permission
//     const tProps = {
//       treeData:permissionTree,
//       value: this.state.value,
//       onChange: this.onChange,
//       treeCheckable: true,
//       showCheckedStrategy: SHOW_PARENT,
//       searchPlaceholder: 'Please select',
//       style: {
//         width: '100%',
//       },
//     };
//     return <TreeSelect {...tProps} />;
//   }
// }
//
// export default PermissionTree;
