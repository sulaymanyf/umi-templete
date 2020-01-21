import { Form, Input, Select, Checkbox, Divider, Modal, TreeSelect, Col } from 'antd';
import React, { Component, Fragment } from 'react';
import style from './index.less';

const { SHOW_PARENT } = TreeSelect;

const { Option } = Select;
const { TextArea } = Input;
const {} = Checkbox;
var checkedVal = [];
var currentVal = [];

class RoleEditor extends Component {
  state = {
    defPermissionValue: [],
    defMenuValue: [],
  };

  // setPermissionDef(defPermissionValue){
  //   this.setState({
  //     defPermissionValue
  //   })
  // }
  // setMenuDef(defMenuValue){
  //   this.setState({
  //     defMenuValue
  //   })
  // }

  componentWillReceiveProps() {
    const { values } = this.props;
    const defPermissionValue = [];
    for (let item in values.permissionVOS) {
      defPermissionValue.push(values.permissionVOS[item].id);
    }
    // this.setPermissionDef(defPermissionValue)

    const defMenuValue = [];
    for (let item in values.menuVOS) {
      defMenuValue.push(values.menuVOS[item].id);
    }
    this.setState({
      defPermissionValue,
      defMenuValue,
    });
  }
  onPerChange = value => {
    this.setState({ defPermissionValue: value });
  };
  onMenuChange = value => {
    this.setState({ defMenuValue: value });
  };

  render() {
    // console.log("this.props", this.props)
    const { values, roles, menus } = this.props;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    console.log('roles===================');
    console.log('roles', roles);
    console.log('roles===================');
    // function getParent(id, aTree) {
    //   var aParent = [];
    //   for (var i in aTree) {
    //     if (aTree[i].pid == id) {
    //       aParent.push(aTree[i]);
    //     }
    //   }
    //   return aParent;
    // }

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

    // console.log("roles", roles)
    let newRoles = [];
    if (roles !== undefined) {
      newRoles = roles.map(iterator => {
        return {
          id: iterator.id,
          pid: iterator.pid,
          key: iterator.name,
          title: iterator.name,
          value: iterator.id,
        };
      });
    }
    let newMenus = [];
    if (menus !== undefined) {
      newMenus = menus.map(iterator => {
        return {
          id: iterator.id,
          pid: iterator.pid,
          key: iterator.name,
          title: iterator.name,
          value: iterator.id,
        };
      });
    }
    console.log('roles.menuVOS', roles);
    console.log('roles.permissionVOS', menus);
    // console.log("newRoles", newMenus)
    const newMenusList = toTree(newMenus);
    const permissionList = toTree(newRoles);

    // this.setMenuDef(defMenuValue)

    console.log('permissionList', permissionList);
    console.log('newMenusList', newMenus);
    //
    // console.log("values", values)
    const tProps = {
      treeData: permissionList,
      value: this.state.defPermissionValue,
      onChange: this.onPerChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    const tMenuProps = {
      treeData: newMenusList,
      value: this.state.defMenuValue,
      onChange: this.onMenuChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    return (
      <Modal
        width={820}
        title="Basic Modal"
        visible={visible}
        onOk={onCreate}
        key={values.id}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="ID"
          >
            {getFieldDecorator('id', {
              initialValue: values.id,
            })(<Input placeholder="请输入" readOnly={true} />)}
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="角色名称"
          >
            {getFieldDecorator('roleName', {
              initialValue: values.roleName == undefined ? null : values.roleName.split('_')[1],
            })(<Input addonBefore="ROLE_" placeholder="请输入" />)}
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="角色描述"
          >
            {getFieldDecorator('description', {
              initialValue: values.description,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Divider />
          {/*{this.props.list.map(tag => (*/}
          {/*  <Tag*/}
          {/*    color="#f50"*/}
          {/*    key={tag.name}*/}
          {/*    checked={selectedTags.indexOf(tag.name) > -1}*/}
          {/*    onChange={checked => this.handleChange(tag.name, checked)}*/}
          {/*  >*/}
          {/*    {tag.name}*/}
          {/*  </Tag>*/}
          {/*))}*/}
          <Form.Item label="拥有权限">
            {getFieldDecorator('permissions', {
              initialValue: this.state.defPermissionValue,
            })(<TreeSelect {...tProps} />)}

            {/*<div style={{ width: 760 }}>*/}

            {/*{values && Object.keys(values).length ? (*/}
            {/*  permissionList.map(per => (*/}
            {/*    <Fragment >*/}
            {/*      <span >{per.name}:</span>*/}
            {/*      <div  >*/}
            {/*         <Checkbox.Group*/}
            {/*           style={{ width: '100%' }}*/}
            {/*           className={style.customTag}*/}
            {/*           options={this.getValue(per)}*/}
            {/*           defaultValue={this.defaultVal(per)}*/}
            {/*           // defaultValue={["关键字搜素"]}*/}
            {/*           onChange={this.onChange}*/}
            {/*         >*/}
            {/*           /!*{ per.children.map(item => (<Row>*!/*/}
            {/*           /!*  <Col span={8}>*!/*/}
            {/*           /!*    <Checkbox value={item.id}>{item.name}</Checkbox>*!/*/}
            {/*           /!*  </Col>*!/*/}
            {/*           /!*</Row>))}*!/*/}
            {/*      </Checkbox.Group>*/}
            {/*      </div>*/}
            {/*    </Fragment>*/}
            {/*  ))) : null}*/}
            {/*<span style={{ marginRight: 8 }}>Categories:</span>*/}
            {/*<Checkbox.Group*/}
            {/*  options={plainOptions}*/}
            {/*  defaultValue={['Apple']}*/}
            {/*  onChange={this.onChange}*/}
            {/*></Checkbox.Group>*/}
            {/*</div>*/}
          </Form.Item>
          <Divider />

          <Form.Item label="拥有菜单">
            {getFieldDecorator('menus', {
              initialValue: this.state.defMenuValue,
            })(<TreeSelect {...tMenuProps} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'form_in_modal' })(RoleEditor);
