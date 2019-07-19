<template>
  <ice-basic-layout horizontal>
    <!-- 左侧logo+菜单 -->
    <ice-layout-aside fixed collapsible>
      <ice-logo-panel slot="header">
        <img slot="logo" src="../assets/Fire.png" alt="" />
        <div slot="title">icefox组件合辑</div>
      </ice-logo-panel>

      <ice-aside-menu :menu-items="items" router />
    </ice-layout-aside>

    <!-- 右侧主体内容 -->
    <ice-layout>
      <ice-layout-header>
        <nav-bar />
      </ice-layout-header>

      <ice-layout-content scrollable>
        <!-- 页签路由视图 -->
        <ice-tabs-view />
      </ice-layout-content>
    </ice-layout>
  </ice-basic-layout>
</template>

<script>
import NavBar from '../components/NavBar/index'

export default {
  name: 'index.route',
  redirect: '/home',
  components: { NavBar },

  data() {
    return {
      items: [
        {
          id: 'homePage',
          title: '首页',
          icon: 'el-icon-star-off',
          route: '/home',
        },
        {
          id: 'charts',
          title: '报表汇总',
          icon: 'el-icon-s-data',
          children: [{ id: 'chart_2', title: 'eChart 图', route: '/line' }],
        },
        {
          id: 'pageTable',
          title: '表格合辑',
          icon: 'el-icon-s-grid',
          children: [
            { id: 'pageTable_2', title: '表格1', route: '/table' },
            { id: 'pageTable_3', title: '表格2', route: '/table1' },
            { id: 'pageTable_4', title: '表格3', route: '/table2' },
          ],
        },
        {
          id: 'date',
          title: '日期控件',
          icon: 'el-icon-sunny',
          children: [{ id: 'date_2', title: '日期控件1', route: '/datepicker' }],
        },
        {
          id: 'split',
          title: '分割面板',
          route: '/split',
          icon: 'el-icon-crop',
          children: [
            { id: 'split_2', title: '分割1', route: '/split' },
            { id: 'split_3', title: '分割2', route: '/detail' },
          ],
        },
        {
          id: 'route',
          title: '路由嵌套',
          route: '/nested',
          icon: 'el-icon-loading',
        },
      ],
    }
  },
}
</script>
