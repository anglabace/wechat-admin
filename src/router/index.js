/**
 * edit by lewyon 2019-02-18
 * 
 */

import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './router';

//  加载muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
//定制主题
import theme from 'muse-ui/lib/theme';
import * as colors from 'muse-ui/lib/theme/colors';
import 'muse-ui/lib/styles/base.less';

import Message from 'muse-ui-message';
import Toast from 'muse-ui-toast';
Vue.use(Message);
Vue.use(Toast);

theme.add('custom-theme', {
  primary: "#2196f3",
  secondary: "#ff4081",
  success: '#4caf50',
  warning: '#f44336',
});

theme.use('custom-theme');
Vue.use(MuseUI);

// 路由配置
Vue.use(Router)
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export default new Router(RouterConfig);
