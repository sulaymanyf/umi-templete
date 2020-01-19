import {Form, Input, Select, Checkbox, Divider, Modal, Row, Col} from 'antd';
import React, { Component ,Fragment} from 'react';
import style from "./index.less";

const { Option } = Select;
const { TextArea } = Input;
const {} = Checkbox;
var  checkedVal =  [];
var  currentVal=[];
class RoleEditor extends Component {

  state = {
  };

  render() {
    console.log("this.props",this.props)
    const {values,roles} = this.props;
    const {visible, onCancel, onCreate, form} = this.props;
    const {getFieldDecorator} = form;
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
    function getParent(id, aTree) {
      var aParent = [];
      for (var i in aTree) {
        if (aTree[i].pid == id) {
          aParent.push(aTree[i]);
        }
      }
      return aParent;
    }
    function toTree(data) {
      // 删除 所有 children,以防止多次调用
      if (data!==undefined){
        data.forEach(function (item) {
          delete item.children;
        });
      }


      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      if (data!==undefined){
        data.forEach(function (item) {
          map[item.id] = item;
        });
      }

//        console.log(map);
      var val = [];
      if (data!==undefined){
        data.forEach(function (item) {
          // 以当前遍历项，的pid,去map对象中找到索引的id
          var parent = map[item.pid];
          // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
          } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
          }
        });
      }
      return val;
    }
    const permissionList = toTree(values.permissionVOS);
    const plainOptions = [];

    console.log("toTree",toTree(values.permissionVOS))
    console.log("roles",roles)
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
      { label: '但是', value: '打撒大' },
      { label: '达式', value: '的撒' },
    ];
    console.log("values",values)
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
              initialValue:values.id,
            })(<Input placeholder="请输入"   readOnly={true}/>)}
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
              initialValue:values.roleName,
            })(<Input placeholder="请输入"   />)}
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
              initialValue:values.description,
            })(<Input placeholder="请输入"   />)}
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
            <div style={{ width: 760 }}>
              {values && Object.keys(values).length ? (
                permissionList.map(per => (
                  <Fragment >
                    <span >{per.name}:</span>
                    <div  >
                       <Checkbox.Group
                         style={{ width: '100%' }}
                         className={style.customTag}
                         options={this.getValue(per)}
                         defaultValue={this.defaultVal(per)}
                         // defaultValue={["关键字搜素"]}
                         onChange={this.onChange}
                       >
                         {/*{ per.children.map(item => (<Row>*/}
                         {/*  <Col span={8}>*/}
                         {/*    <Checkbox value={item.id}>{item.name}</Checkbox>*/}
                         {/*  </Col>*/}
                         {/*</Row>))}*/}
                    </Checkbox.Group>
                    </div>
                  </Fragment>
                ))) : null}
              {/*<span style={{ marginRight: 8 }}>Categories:</span>*/}
              {/*<Checkbox.Group*/}
              {/*  options={plainOptions}*/}
              {/*  defaultValue={['Apple']}*/}
              {/*  onChange={this.onChange}*/}
              {/*></Checkbox.Group>*/}
            </div>
          </Form.Item>
          <Divider />

          <Form.Item label="拥有菜单">
            <div style={{ width: 550 }}>
              <span style={{ marginRight: 8 }}>Categories:</span>
              <Checkbox.Group
                options={plainOptions}
                defaultValue={['Apple']}
                onChange={this.onChange}
              />
            </div>
          </Form.Item>

        </Form>
      </Modal>
    );
  }

  getValue=(pre)=> {
    const plainOptions = [];
    for (let parentElement of  pre.children) {
      plainOptions.push()
      plainOptions.push({ label: parentElement.name, value: parentElement.id.toString() })
    }
    return plainOptions;
  }



  onChange=(checkedValues)=> {
    for(var i in checkedValues){
      currentVal.push(checkedValues[i]);
    }
    currentVal=checkedValues.filter(function(v){ return checkedVal.indexOf(v) > -1 })
  }
  defaultVal=(per)=> {
    const defaultVal = [];
    for (let parentElement of  per.children) {
      defaultVal.push(parentElement.id)
    }
    for(var i in defaultVal){
      checkedVal.push(defaultVal[i]);
    }
    checkedVal=[...new Set(checkedVal)]
    return defaultVal;
  }
}

export default Form.create({ name: 'form_in_modal' })(RoleEditor);
