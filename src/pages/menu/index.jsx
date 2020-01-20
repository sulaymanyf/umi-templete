import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Table, Divider, Card, Button, Icon } from 'antd';
import { connect } from 'dva';
import MenuEditor from '@/pages/menu/components';

@connect(({ menu, loading }) => ({ menu, loading }))
class Menu extends Component {
  state = {
    visible: false,
    fromValue: {},
    data: [],
    roles: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/getTree',
    });
  }

  showModal = obj => {
    console.log(obj);
    this.setState({
      visible: true,
      id: obj.id,
      fromValue: obj,
    });
  };
  deleteModal = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/deleteById',
      payload: obj.id,
    });
  };
  showModalAdd = obj => {
    console.log(obj);
    this.setState({
      visible: true,
      // id: obj.id,
      fromValue: { id: obj.id },
    });
  };

  handleCreate = () => {
    console.log('handleCreate', this);
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      const { dispatch } = this.props;
      dispatch({
        type: 'menu/saveAndUpDate',
        payload: values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { menuTree } = this.props.menu;
    console.log('menuList', menuTree);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Path',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: icon => (
          <span>
            <Icon type={icon} theme="outlined" />
          </span>
        ),
      },
      {
        title: 'Sort',
        key: 'sort',
        dataIndex: 'sort',
      },
      {
        title: 'Code',
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Divider type="vertical" />
            <Button
              type="primary"
              size={'small'}
              onClick={() => {
                this.showModalAdd(record);
              }}
            >
              New
            </Button>
            <Divider type="vertical" />
            <Button
              type="dashed"
              size={'small'}
              onClick={() => {
                this.showModal(record);
              }}
            >
              Editor
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              size={'small'}
              onClick={() => {
                this.deleteModal(record);
              }}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ];

    //
    return (
      <PageHeaderWrapper content="这是一个新页面，从这里进行开发！">
        <div style={{ marginTop: 30 }}>
          <Card>
            {/*{perm.data}*/}
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
              Add a menu
            </Button>
            <Table columns={columns} dataSource={menuTree} />
            <MenuEditor
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              values={this.state.fromValue}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }

  handleAdd = () => {
    this.setState({
      visible: true,
      fromValue: {},
    });
  };
}

export default Menu;
