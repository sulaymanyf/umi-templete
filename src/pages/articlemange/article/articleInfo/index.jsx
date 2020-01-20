import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Icon,
  Input,
  Select,
  Popover,
  AutoComplete,
  Steps,
  Table,
  Col,
  Row,
} from 'antd';
import FileViewer from 'react-file-viewer';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './style.less';
// import Link from "umi/link";
// import moment from "moment";
// import EditableLinkGroup from "@/pages/workplace/components/EditableLinkGroup";
// import Radar from "@/pages/workplace/components/Radar";
// import TinyEdiot from "@/pages/articlemange/article/components/TinyEdiot";
import ArticleEditor from '@/pages/editor/ArticleEditor';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

const InputGroup = Input.Group;
const { Search } = Input;
const { Step } = Steps;
const { Option } = Select;

const ButtonGroup = Button.Group;
// const menu = (
//   <Menu>
//     <Menu.Item key="1">选项一</Menu.Item>
//     <Menu.Item key="2">选项二</Menu.Item>
//     <Menu.Item key="3">选项三</Menu.Item>
//   </Menu>
// );
// const mobileMenu = (
//   <Menu>
//     <Menu.Item key="1">操作一</Menu.Item>
//     <Menu.Item key="2">操作二</Menu.Item>
//     <Menu.Item key="3">选项一</Menu.Item>
//     <Menu.Item key="4">选项二</Menu.Item>
//     <Menu.Item key="">选项三</Menu.Item>
//   </Menu>
// );
// const action = (
//   <RouteContext.Consumer>
//     {({ isMobile }) => {
//       if (isMobile) {
//         return (
//           <Dropdown.Button
//             type="primary"
//             icon={<Icon type="down" />}
//             overlay={mobileMenu}
//             placement="bottomRight"
//           >
//             主操作
//           </Dropdown.Button>
//         );
//       }
//
//       return (
//         <Fragment>
//           <ButtonGroup>
//             <Button>操作一</Button>
//             <Button>操作二</Button>
//             <Dropdown overlay={menu} placement="bottomRight">
//               <Button>
//                 <Icon type="ellipsis" />
//               </Button>
//             </Dropdown>
//           </ButtonGroup>
//           <Button type="primary">主操作</Button>
//         </Fragment>
//       );
//     }}
//   </RouteContext.Consumer>
// );
const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="Durum" value="Onay bekleniyor" />
    <Statistic title="Sipariş miktarı" value={568.08} prefix="₺" />
  </div>
);
const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="Oluşturan">rukiye şeyma ye</Descriptions.Item>
        <Descriptions.Item label="Sipariş ürünü">çeviri</Descriptions.Item>
        <Descriptions.Item label="Yaratılış zamanı">2020-0-01</Descriptions.Item>
        <Descriptions.Item label="İlgili belgeler">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Geçerlilik tarihi">2020--01-01 ~ 2020-08-08</Descriptions.Item>
        {/*<Descriptions.Item label="Bitiş tarihi">2017-07-07 ~ 2017-08-08</Descriptions.Item>*/}
        <Descriptions.Item label="Note">Lütfen iki iş günü içinde onaylayın</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);
const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <Icon
        type="dingding-o"
        style={{
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);
const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon
        type="dingding-o"
        style={{
          color: '#00A0E9',
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);
const popoverContent = (
  <div
    style={{
      width: 160,
    }}
  >
    吴加号
    <span
      className={styles.textSecondary}
      style={{
        float: 'right',
      }}
    >
      <Badge
        status="default"
        text={
          <span
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            未响应
          </span>
        }
      />
    </span>
    <div
      className={styles.textSecondary}
      style={{
        marginTop: 4,
      }}
    >
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }

  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];
const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }

      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

class ArticleInfo extends Component {
  state = {
    ceviri: {},
    operationKey: 'tab1',
    tabActiveKey: 'detail',
    metinId: '',
    dataSource: [],
    durumStatus: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      word: {},
      keyWord: '',
      searchFlag: false,
      exlp: 'dsadada',
    };
    this.state.metinId = this.props.location.query.id;
  }

  componentDidMount() {
    console.log();
    // this.setState((prevState, props) => ({
    //   metinId: this.props.location.query.id
    // }));
    console.log(this.state.metinId);
  }

  onOperationTabChange = key => {
    this.setState({
      operationKey: key,
    });
  };
  onRef = ref => {
    this.child = ref;
  };
  onTabChange = tabActiveKey => {
    this.setState({
      tabActiveKey,
    });
  };
  //	 * ID
  // 	 */
  //     private String id;
  //
  // 	/**
  // 	 * 用户ID
  // 	 */
  //     private String userId;
  //
  //
  //
  // 	/**
  // 	 * 原文id
  // 	 */
  //     private String metinId;
  //
  // 	/**
  // 	 * 译文标题
  // 	 */
  //     private String title;
  //
  // 	/**
  // 	 * 译文正文
  // 	 */
  //     private String content;
  //
  //
  // 	/**
  // 	 * contentHtml
  // 	 */
  //     private String ;
  handleSave = e => {
    console.log(this.child.state);
    const { outputHTML, outputTEXT } = this.child.state;
    const { dispatch } = this.props;
    var params = {
      id: '1213501666091872258',
      userId: '123456',
      metinId: this.state.metinId,
      title: 'Gates',
      content: outputTEXT,
      contentHtml: outputHTML,
    };
    console.log(params);
    dispatch({
      type: 'metin/saveCeviri',
      payload: params,
      // callback: (res) => {
      //   console.log("请求完成后返回的结果")
      //   if (res) {
      //     console.log("请求完成后返回的结果")
      //     console.log(res);// 请求完成后返回的结果
      //   }
      // }
    });
  };
  onPressEnter = () => {
    console.log(this.state.keyWord === '');
    if (this.state.keyWord === '') {
      console.log('sssss');
      this.setState({
        searchFlag: false,
      });
      return;
    }
    this.setState({
      searchFlag: true,
      word: { name: 'word', trans: 'tarans', addr: 'adddrs' },
    });
    console.log('this.state.searchFlag', this.state.searchFlag);
    this.forceUpdate();
  };

  closeWord = () => {
    console.log('closeWord');
    this.setState({
      searchFlag: false,
      keyWord: '',
    });
  };
  inputChange = value => {
    console.log('inputChange');
    console.log(value.length);
    if (value.length > 3) {
      const { dispatch } = this.props;
      dispatch({
        type: 'ceviri/getWordList',
        payload: value,
        callback: res => {
          if (res) {
            this.setState({
              dataSource: res.data,
            });
          }
        },
      });
    }
    // alert(e.target.value)
  };
  OnSelectWord = value => {
    console.log(value);
    console.log('OnSelectWord');
    this.props.dispatch({
      type: 'ceviri/getWord',
      payload: value,
      callback: res => {
        if (res) {
          console.log('res', res);
          this.setState({
            word: res.data,
            searchFlag: true,
          });
        }
      },
    });
    console.log('this.state.word', this.state.word);
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { articlemangeAndarticleInfo, loading } = this.props;
    const {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
    } = articlemangeAndarticleInfo;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="Sipariş numarası：234231029431"
        // extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
      >
        <Row gutter={24} style={{ marginLeft: 0, marginRight: 0 }}>
          <Card
            style={{
              marginBottom: 24,
            }}
            title="sozluk"
            bordered={false}
            loading={projectLoading}
            bodyStyle={{
              padding: 4,
            }}
          >
            <InputGroup compact style={{ width: '50%', height: 60, marginTop: 10, marginLeft: 30 }}>
              <Select defaultValue="en-tr" style={{ width: '16%' }}>
                <Option value="en-tr">en</Option>
                <Option value="tr-en">tr</Option>
                <Option value="tr-en">zh</Option>
              </Select>
              {/*<Input style={{width: '50%'}} value={this.state.keyWord} onPressEnter={this.onPressEnter} onChange={this.inputChange}/>*/}
              {/*<Search style={{width: '50%'}}  placeholder="input search text"*/}
              {/*        onSearch={this.onPressEnter} onChange={this.inputChange} enterButton/>*/}
              <AutoComplete
                dataSource={this.state.dataSource}
                style={{ width: '50%' }}
                onChange={this.inputChange}
                onSearch={this.onPressEnter}
                onSelect={this.OnSelectWord}
                placeholder="input search text"
                enterButton
              />
            </InputGroup>

            {this.state.searchFlag ? (
              <div>
                <span
                  onClick={this.closeWord}
                  className={styles.close}
                  style={{ marginTop: 10, marginRight: 10 }}
                />
                <Descriptions
                  column={1}
                  size="small"
                  bordered={true}
                  layout="horizontal"
                  title={this.state.keyWord}
                  style={{ marginTop: 7, marginLeft: 40 }}
                >
                  <Descriptions.Item label="phonetic">{this.state.word.phonetic}</Descriptions.Item>
                  <Descriptions.Item label="definition">
                    {this.state.word.definition}
                  </Descriptions.Item>
                  <Descriptions.Item label="chinese">
                    {this.state.word.translation}
                  </Descriptions.Item>
                  <Descriptions.Item label="turkish">{this.state.word.turkish}</Descriptions.Item>
                </Descriptions>
              </div>
            ) : null}
          </Card>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="ORJINAL METIN"
              bordered={false}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              <div style={{ height: 800 }}>
                <FileViewer
                  fileType={'docx'}
                  filePath={'api/ceviri-kizlar/v1/read-file/' + this.state.metinId}
                />
              </div>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              title="ÇEVIRI"
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
              extra={
                <Button size={'small'} onClick={this.handleSave} type="primary">
                  Kaydet
                </Button>
              }
            >
              <div style={{ height: 800 }}>
                <ArticleEditor onRef={this.onRef} id={this.state.metinId} />
              </div>

              {/*<ArticleEditor/>*/}
              {/*<TinyEdiot id={1211632064957337602}/>*/}
            </Card>
          </Col>
        </Row>

        <div className={styles.main}>
          <GridContent>
            <Card
              title={formatMessage({ id: 'article.durum.title' })}
              style={{
                marginBottom: 24,
              }}
            >
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot={customDot}
                    current={this.state.durumStatus}
                  >
                    <Step title={formatMessage({ id: 'article.durum.one' })} description={desc1} />
                    <Step title={formatMessage({ id: 'article.durum.two' })} description={desc2} />
                    <Step title={formatMessage({ id: 'article.durum.three' })} />
                    <Step title={formatMessage({ id: 'article.durum.fore' })} />
                    <Step title={formatMessage({ id: 'article.durum.five' })} />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            {/*<Card*/}
            {/*  title="用户信息"*/}
            {/*  style={{*/}
            {/*    marginBottom: 24,*/}
            {/*  }}*/}
            {/*  bordered={false}*/}
            {/*>*/}
            {/*  <Descriptions*/}
            {/*    style={{*/}
            {/*      marginBottom: 24,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>*/}
            {/*    <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>*/}
            {/*    <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>*/}
            {/*    <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>*/}
            {/*    <Descriptions.Item label="联系地址">*/}
            {/*      曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口*/}
            {/*    </Descriptions.Item>*/}
            {/*  </Descriptions>*/}
            {/*  <Descriptions*/}
            {/*    style={{*/}
            {/*      marginBottom: 24,*/}
            {/*    }}*/}
            {/*    title="信息组"*/}
            {/*  >*/}
            {/*    <Descriptions.Item label="某某数据">725</Descriptions.Item>*/}
            {/*    <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>*/}
            {/*    <Descriptions.Item*/}
            {/*      label={*/}
            {/*        <span>*/}
            {/*          某某数据*/}
            {/*          <Tooltip title="数据说明">*/}
            {/*            <Icon*/}
            {/*              style={{*/}
            {/*                color: 'rgba(0, 0, 0, 0.43)',*/}
            {/*                marginLeft: 4,*/}
            {/*              }}*/}
            {/*              type="info-circle-o"*/}
            {/*            />*/}
            {/*          </Tooltip>*/}
            {/*        </span>*/}
            {/*      }*/}
            {/*    >*/}
            {/*      725*/}
            {/*    </Descriptions.Item>*/}
            {/*    <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>*/}
            {/*  </Descriptions>*/}
            {/*  <h4*/}
            {/*    style={{*/}
            {/*      marginBottom: 16,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    信息组*/}
            {/*  </h4>*/}
            {/*  <Card type="inner" title="多层级信息组">*/}
            {/*    <Descriptions*/}
            {/*      style={{*/}
            {/*        marginBottom: 16,*/}
            {/*      }}*/}
            {/*      title="组名称"*/}
            {/*    >*/}
            {/*      <Descriptions.Item label="负责人">林东东</Descriptions.Item>*/}
            {/*      <Descriptions.Item label="角色码">1234567</Descriptions.Item>*/}
            {/*      <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>*/}
            {/*      <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>*/}
            {/*      <Descriptions.Item label="描述">*/}
            {/*        这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...*/}
            {/*      </Descriptions.Item>*/}
            {/*    </Descriptions>*/}
            {/*    <Divider*/}
            {/*      style={{*/}
            {/*        margin: '16px 0',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    <Descriptions*/}
            {/*      style={{*/}
            {/*        marginBottom: 16,*/}
            {/*      }}*/}
            {/*      title="组名称"*/}
            {/*      column={1}*/}
            {/*    >*/}
            {/*      <Descriptions.Item label="学名">*/}
            {/*        Citrullus lanatus (Thunb.) Matsum. et*/}
            {/*        Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..*/}
            {/*      </Descriptions.Item>*/}
            {/*    </Descriptions>*/}
            {/*    <Divider*/}
            {/*      style={{*/}
            {/*        margin: '16px 0',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    <Descriptions title="组名称">*/}
            {/*      <Descriptions.Item label="负责人">付小小</Descriptions.Item>*/}
            {/*      <Descriptions.Item label="角色码">1234568</Descriptions.Item>*/}
            {/*    </Descriptions>*/}
            {/*  </Card>*/}
            {/*</Card>*/}
            {/*<Card*/}
            {/*  title="用户近半年来电记录"*/}
            {/*  style={{*/}
            {/*    marginBottom: 24,*/}
            {/*  }}*/}
            {/*  bordered={false}*/}
            {/*>*/}
            {/*  <Empty />*/}
            {/*</Card>*/}
            {/*<Card*/}
            {/*  className={styles.tabsCard}*/}
            {/*  bordered={false}*/}
            {/*  tabList={operationTabList}*/}
            {/*  onTabChange={this.onOperationTabChange}*/}
            {/*>*/}
            {/*  {contentList[operationKey]}*/}
            {/*</Card>*/}
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ articlemangeAndarticleInfo, loading }) => ({
  articlemangeAndarticleInfo,
  loading: loading.effects['articlemangeAndarticleInfo/fetchAdvanced'],
}))(ArticleInfo);
