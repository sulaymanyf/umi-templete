import { Button, Divider, Table, Form, Tag, Card, Spin } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import TagEditor from './components/TagEditor';
import { connect } from 'dva';

const TipList = props => {
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const { dispatch, tip } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tip/getList',
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function toTree(data) {
    // 删除 所有 children,以防止多次调用
    if (data !== undefined) {
      data.forEach(function(item) {
        delete item.children;
      });
    }

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {};
    if (data !== undefined) {
      data.forEach(function(item) {
        map[item.id] = item;
      });
    }
    //        console.log(map);
    let val = [];
    if (data !== undefined) {
      data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        let parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
    }
    return val;
  }

  // // console.log("roles", roles)
  // let tepm = [];
  // if (tipList !== undefined) {
  //   tepm = tipList.map(iterator => {
  //     return {
  //       id: iterator.id,
  //       pid: iterator.pid,
  //       key: iterator.name,
  //       title: iterator.name,
  //       value: iterator.id,
  //     };
  //   });
  // }

  const { tipList } = tip;
  const newtipList = toTree(tipList);
  console.log('newtipList', newtipList);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'TypeName',
      dataIndex: 'typeName',
    },
    {
      title: 'TypeInfo',
      dataIndex: 'typeInfo',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   valueEnum: {
    //     0: {
    //       text: '关闭',
    //       status: 'Default',
    //     },
    //     1: {
    //       text: '运行中',
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: '已上线',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '异常',
    //       status: 'Error',
    //     },
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size={'small'}
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Editor
          </Button>
          <Divider type="vertical" />
          <Button type="primary" size={'small'} onClick={() => handleSonAdd(record)}>
            new
          </Button>
          <Divider type="vertical" />
          <Button type="dashed" size={'small'} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const handleAdd = () => {
    setStepFormValues({});
    handleModalVisible(true);
    console.log('stepFormValues', stepFormValues);
  };

  const handleSonAdd = record => {
    setStepFormValues({ pid: record.id });
    handleModalVisible(true);
    console.log('stepFormValues', stepFormValues);
  };

  const handleDelete = obj => {
    console.log(obj);
    if (dispatch) {
      dispatch({
        type: 'tip/Delete',
        payload: obj.id,
      });
    }
  };
  // const onChangePage = (current) => {
  //   console.log(current)
  //   if (dispatch) {
  //     dispatch({
  //       type: 'tag/getPage',
  //       payload: {current: current, size: 10}
  //     });
  //   }
  // };
  const handleCreate = values => {
    console.log('handleCreate', values);
    if (dispatch) {
      dispatch({
        type: 'tip/add',
        payload: values,
      });

      handleModalVisible(false);
    }

    setStepFormValues({});
  };

  const handleCancel = () => {
    handleModalVisible(false);
    setStepFormValues({});
  };

  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <Spin spinning={loading} size="large"></Spin>
      <Card>
        <div>
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a Role
          </Button>
          <Table columns={columns} dataSource={newtipList} />
          <TagEditor
            visible={createModalVisible}
            onCancel={handleCancel}
            onCreate={handleCreate}
            values={stepFormValues}
          />
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ tip, loading }) => ({ tip, loading }))(Form.create()(TipList));
