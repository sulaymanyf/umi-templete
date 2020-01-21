import { Button, Divider, Dropdown, Form, Icon, Menu, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { connect } from 'dva';
import { queryRule, updateRule, addRule, removeRule } from './service';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import EditorForm from '@/pages/articlemange/article/components/EditorForm';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRule({
      title: fields.title,
      metinType: fields.type[0],
      fileId: fields.file.file.response.message,
      mark: fields.note,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      title: fields.title,
      type: fields.type,
      file: fields.file,
      note: fields.note,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  const onChange = e => {
    dispatch({
      type: 'item/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };
  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

//    NEW(1,"新增"),
//     TRANSLATING(2,"翻译中"),
//     UPDATE(3,"更新"),
//     END(4,"结束");
const TableList = ({ metin, dispatch }) => {
  console.log(metin);
  console.log('metin');
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [formValues, setFormValues] = useState({});
  const { records } = metin;

  const actionRef = useRef();

  const getOneMetin = id => {
    console.log(id);
    dispatch({
      type: 'metin/getMetin',
      payload: id,
    }).then(res => {
      console.log(res);
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    // {
    //   title: 'content',
    //   dataIndex: 'content',
    // },
    {
      title: 'status',
      dataIndex: 'status',
      valueEnum: {
        1: {
          text: 'NEW',
          status: 'Default',
        },
        2: {
          text: 'TRANSLATING',
          status: 'Processing',
        },
        3: {
          text: 'UPDATE',
          status: 'Success',
        },
        4: {
          text: 'END',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              dispatch({
                type: 'metin/getMetin',
                payload: record.id,
              });
              console.log(record.id);
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            {formatMessage({ id: 'article.basic.incele' })}
          </a>
          <Divider type="vertical" />
          <Link to={`article/articleInfo?id=${record.id}`}>
            {formatMessage({ id: 'article.basic.detail' })}
          </Link>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleEditorModalVisible(true);
              console.log(record);
              setFormValues(record);
            }}
          >
            {formatMessage({ id: 'article.basic.update' })}
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle={formatMessage({ id: 'article.basic.Inquiry-form' })}
        // actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon="plus" type="primary" onClick={() => handleModalVisible(true)}>
            {formatMessage({ id: 'article.basic.new' })}
          </Button>,
          // selectedRows && selectedRows.length > 0 && (
          //   <Dropdown
          //     overlay={
          //       <Menu
          //         onClick={async e => {
          //           if (e.key === 'remove') {
          //             await handleRemove(selectedRows);
          //             action.reload();
          //           }
          //         }}
          //         selectedKeys={[]}
          //       >
          //         <Menu.Item key="remove">批量删除</Menu.Item>
          //         <Menu.Item key="approval">批量审批</Menu.Item>
          //       </Menu>
          //     }
          //   >
          //     <Button>
          //       批量操作 <Icon type="down" />
          //     </Button>
          //   </Dropdown>
          // ),
        ]}
        dataSource={records}
        // tableAlertRender={
        //   (selectedRowKeys, selectedRows) => (
        //   <div>
        //     已选择{' '}
        //     <a
        //       style={{
        //         fontWeight: 600,
        //       }}
        //     >
        //       {selectedRowKeys.length}
        //     </a>{' '}
        //     项&nbsp;&nbsp;
        //     <span>
        //       服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
        //     </span>
        //   </div>
        // )
        //}
        // request?: (params?: {
        //         pageSize?: number;
        //         current?: number;
        //         [key: string]: any;
        //     }) => Promise<RequestData<T>>;
        // request={params => {
        //   console.log('s...........');
        //   var ress = null;
        //   if (metin.metins.data == undefined) {
        //     dispatch({
        //       type: 'metin/fetch',
        //       payload: params,
        //     });
        //   }
        //   console.log(metin.metins.data);
        //   console.log('s...........');
        //   if (!metin.metins.flag) {
        //     return null;
        //   }
        //   ress = metin.metins.data;
        //   // var res = queryRule(params)
        //   // console.log(res)
        //   // return res.then((v)=>{
        //   //   console.log("s...........")
        //   //   console.log(v.data)
        //   //   let data = v.data;
        //   //   console.log("s...........")
        //   const result = {
        //     data: ress.records,
        //     total: ress.total,
        //     success: true,
        //     pageSize: ress.size,
        //     current: parseInt(`${params.currentPage}`, 10) || 1,
        //   };
        //   //   console.log(result)
        //   return result;
        //   // })
        // }}
        columns={columns}
        // rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {formValues && Object.keys(formValues).length ? (
        <EditorForm
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleEditorModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleEditorModalVisible(false);
            setFormValues({});
          }}
          editorModalVisible={editorModalVisible}
          values={formValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ metin }) => ({ metin }))(TableList);
