import { Button, Divider, Table, Form, Tag, Card } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TagEditor from './components/TagEditor';
import { connect } from 'dva';

const TableList = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const { dispatch } = props;
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tag/getPage',
        payload: { current: 0, size: 10 },
      });
    }
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'TagName',
      dataIndex: 'tagName',
    },
    {
      title: 'TagColor',
      dataIndex: 'tagColor',
      render: tags => (
        <span>
          <Tag color={tags}>{tags}</Tag>
        </span>
      ),
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

  const handleDelete = obj => {
    console.log(obj);
    if (dispatch) {
      dispatch({
        type: 'tag/Delete',
        payload: obj.id,
      });
    }
  };
  const onChangePage = current => {
    console.log(current);
    if (dispatch) {
      dispatch({
        type: 'tag/getPage',
        payload: { current: current, size: 10 },
      });
    }
  };
  const handleCreate = values => {
    console.log('handleCreate', values);
    if (dispatch) {
      dispatch({
        type: 'tag/add',
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
  console.log('this.props', props);
  const { tagPage } = props.tag;
  const { records } = tagPage;

  return (
    <PageHeaderWrapper content="这是一个新页面，从这里进行开发！">
      <Card>
        <div>
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a Role
          </Button>
          <Table
            columns={columns}
            pagination={{
              pageSize: 10,
              total: tagPage.total,
              onChange: onChangePage,
            }}
            dataSource={tagPage.records}
          />
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

export default connect(({ tag, loading }) => ({ tag, loading }))(Form.create()(TableList));
