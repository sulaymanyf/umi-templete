import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import styles from './Styles';
import ejs from 'ejs';
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

class sozluk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserList[0],
      color: colorList[0],
    };
  }
  people = ['geddy', 'neil', 'alex'];

  render() {
    return <div></div>;
  }
}

export default sozluk;
