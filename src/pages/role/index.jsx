import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Divider, Row, Table } from 'antd';
import { connect } from 'dva';
import RoleTags from './components/role';
import RoleEditor from './components/roleEditor';

@connect(({ permission, loading }) => ({ permission, loading }))
class Role extends Component {
  state = {
    visible: false,
    fromValue: {},
    roles: {},
    data: [],
  };
  //
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/getRoleList',
      payload: '',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  EditorModal = obj => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/getRoles',
      payload: obj.id,
      callback: res => {
        if (res) {
          console.log('res', res.data); // 请求完成后返回的结果
          this.setState({
            roles: res.data[0],
          });
        }
      },
    });
    console.log('obj', obj);
    this.setState({
      visible: true,
      fromValue: obj,
    });
  };

  onExpandedRowRender = (expanded, record) => {
    const permissionlist = expanded.permissionVOS;
    const menulist = expanded.menuVOS;
    console.log(record);
    return (
      <Fragment>
        <Row>
          <li>
            <Col span={12}>
              <RoleTags title={'permission'} list={permissionlist} />
            </Col>
            <Col span={12}>
              <RoleTags title={'menu'} list={menulist} />
            </Col>
          </li>
          {/*{list.map((item, index) => {*/}
          {/*  // item子体   index下标*/}
          {/*  // react里一般使用map遍历，通过return返回渲染代码块*/}
          {/*  // map可用于返回符合条件的内容结合if语句*/}
          {/*  // map不结合if判断语句则可以遍历数组，返回全部数组的内容*/}

          {/*})}*/}
        </Row>
      </Fragment>
    );
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
    const { roleList } = this.props.permission;
    console.log(roleList);
    console.log('this.state.visible', this.state.visible);
    const columns = [
      { title: 'id', dataIndex: 'id', key: 'id' },
      { title: 'RoleName', dataIndex: 'roleName', key: 'roleName' },
      { title: 'description', dataIndex: 'description', key: 'description' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <Fragment>
            <Button type="primary" size={'small'} onClick={this.showModal}>
              New Collection
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size={'small'}
              onClick={() => {
                this.EditorModal(record);
              }}
            >
              editor
            </Button>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper content="这是一个新页面，从这里进行开发！">
        <Card>
          <Table
            columns={columns}
            // expandedRowRender={record => {children}}
            onExpand={this.onExpandedRowRender.bind(this)}
            expandedRowRender={record => this.onExpandedRowRender(record)}
            dataSource={roleList}
          />
          <RoleEditor
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            values={this.state.fromValue}
            roles={this.state.roles}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Role;
