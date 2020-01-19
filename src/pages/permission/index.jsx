import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect, Component} from 'react';
import styles from './index.less';
import {Table, Divider, Tag, Card, Button, Modal} from 'antd';
import {connect} from 'dva';
import PermissionEditor from './components/index';





@connect(({permission, loading}) => ({permission, loading}))
class Permission extends Component {
  state = {
    visible: false,
    fromValue:{},
    data:[]
  };


  componentDidMount() {
    const {dispatch} = this.props;
    const { permission, loading, location } = this.props
    const { perm } =permission
    dispatch({
      type: 'permission/getList',
    });
    console.log("componentDidMount", permission)
  }

  showModal = (obj) => {

    console.log(obj.id)
    this.setState({
      visible: true,
      fromValue:obj
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'permission/getOne',
      payload:obj.id.toString()
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    const { perm } =this.props.permission


    const columns = [
      {
        title: 'Name',
        dataIndex: 'menuName',
        key: 'menuName',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: 'Tags',
        key: 'perName',
        dataIndex: 'perName',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Divider type="vertical"/>
            <Button type="primary" size={'small'} onClick={()=>{this.showModal(record)}}>
              {record.menuName}
            </Button>
            <Divider type="vertical"/>
            <Button type="primary" size={'small'} >
              New Collection
            </Button>
          </span>
        ),
      },
    ];
    //
    return (
      <PageHeaderWrapper  >
        <Card>
          {/*{perm.data}*/}
          <Table columns={columns} dataSource={perm.data} />
          <Modal
            width={800}
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <PermissionEditor values={this.state.fromValue}/>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}


export default Permission;
