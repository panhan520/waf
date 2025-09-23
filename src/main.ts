import 'vue/jsx'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 引入windi css
import '@/plugins/unocss'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.less'

// 引入动画
import '@/plugins/animate.css'

// 路由
import { setupRouter } from './router'

// 权限
import { setupPermission } from './directives'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

let app: any = null
// 创建实例
async function render(props: any = {}) {
  app = createApp(App)

  await setupI18n(app)
  setupStore(app)
  setupGlobCom(app)
  setupElementPlus(app)
  setupRouter(app)
  setupPermission(app)

  // qiankun 下，容器要挂到 props.container 内部
  app.mount(props.container ? props.container.querySelector('#app') : '#app')
}
// 独立运行时，直接执行 render()
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}

// ✅ qiankun 生命周期钩子
renderWithQiankun({
  bootstrap() {
    console.log('子应用 bootstrap')
  },
  mount(props) {
    console.log('子应用 mount', props)
    render(props)
  },
  unmount() {
    console.log('子应用 unmount')
    if (app) {
      app.unmount()
      app = null
    }
  },
  update(props) {
    console.log('子应用 update', props)
  }
})
