import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, Component, Fragment } from 'react';
import { Button, Card, Col, Divider, Modal, Row, Spin, Table } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import RoleTags from './components/role';
import RoleEditor from './components/roleEditor';

const expandedRowRenders = record => <p style={sstyle}>{record}</p>;

class Role extends Component {
  state = {
    expandVisible: {},
    expandedRowRenders,
    expandedData: {},
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
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

  onExpandedRowRender = (expanded, record) => {
    const { dispatch } = this.props;
    console.log('record', record);
    const list = [
      { id: 1, name: '你妹', age: '20' },
      { id: 2, name: '你哥', age: '20' },
      { id: 3, name: '你姐', age: '20' },
      { id: 4, name: '你表姐', age: '20' },
    ];
    const namelist = ['你妹', '你哥', '你姐', '你表姐'];
    const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

    return (
      <Fragment>
        <Row>
          {list.map((item, index) => {
            // item子体   index下标
            // react里一般使用map遍历，通过return返回渲染代码块
            // map可用于返回符合条件的内容结合if语句
            // map不结合if判断语句则可以遍历数组，返回全部数组的内容
            return (
              <li key={item.id}>
                {index / 2 == 0 ? (
                  <Col span={12}>
                    {' '}
                    <RoleTags list={list} />
                  </Col>
                ) : null}
                {index / 1 == 0 ? null : (
                  <Col span={12}>
                    {' '}
                    <RoleTags list={list} />
                  </Col>
                )}
              </li>
            );
          })}
        </Row>
      </Fragment>
    );
    // if (expanded) {
    // dispatch({
    //       //   type: 'data/list',
    //       //   listId: record.id,
    //       // }).then((dataOneData) => {
    //       //   const res = {
    //       //     ...this.state.expandedData,
    //       //     [record.id]: dataOneData,
    //       //   };
    //       //
    //       //   this.setState({
    //       //     expandVisible:{
    //       //       ...this.state.expandVisible,
    //       //       [record.id]: true,
    //       //     },
    //       //     subTabData:res,
    //       //     //注意,用key对应value的形式来标识每个扩展行的子组件,不然,一个请求,所有数据又变成一个了...访问的时候,根据key来访问
    //       //     expandedRowRenders: {
    //       //       ...this.state.expandedRowRenders,
    //       //       [record.id]:<Expand expandVisible expandRecord={record} dataonedata={res} />,
    //       //     },
    //       //   });
    //       // });
    // } else {
    //   // 当关闭扩展行的时候,仅仅把改行改成false,其他行不用改,不然导致的bug就是关闭了某一行,其他行数据都没了.....
    //   this.setState({
    //     expandVisible: {
    //       ...this.state.expandVisible,
    //       [record.id]: false,
    //     }
    //   });
    // }
  };

  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => (
          <Fragment>
            <Button type="primary" size={'small'} onClick={this.showModal}>
              New Collection
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size={'small'}>
              {' '}
              editor
            </Button>
          </Fragment>
        ),
      },
    ];

    const data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description:
          'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
    ];

    //<Card style={{ width: 300 }}>
    //     <p>Card content</p>
    //     <p>Card content</p>
    //     <p>Card content</p>
    //   </Card>,

    return (
      <PageHeaderWrapper content="这是一个新页面，从这里进行开发！" className={styles.main}>
        <Card>
          <Table
            columns={columns}
            // expandedRowRender={record => {children}}
            onExpand={this.onExpandedRowRender.bind(this)}
            expandedRowRender={record => this.onExpandedRowRender(record)}
            dataSource={data}
          />
          <Modal
            width={800}
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <RoleEditor />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect()(Role);
