import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({
          id: 'system.settings.open',
        })}
        unCheckedChildren={formatMessage({
          id: 'system.settings.close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage(
          {
            id: 'system.notification.password',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'system.notification.password-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'system.notification.messages',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'system.notification.messages-description',
          },
          {},
        ),
        actions: [Action],
      },
      {
        title: formatMessage(
          {
            id: 'system.notification.todo',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'system.notification.todo-description',
          },
          {},
        ),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
