import component from './tr-TR/component';
import globalHeader from './tr-TR/globalHeader';
import menu from './tr-TR/menu';
import pwa from './tr-TR/pwa';
import settingDrawer from './tr-TR/settingDrawer';
import settings from './tr-TR/settings';
export default {
  'navBar.lang': 'Dil',
  'layout.user.link.help': 'yardim',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
