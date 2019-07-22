<template>
  <div id="caseManage">
    <div id="caseLeft">
      <el-tabs
        tab-position="left"
        style="height: 100%;"
        @tab-click="tabClick"
        value="importWord"
      >
        <el-tab-pane label="关键词标签" name="importWord"></el-tab-pane>
        <el-tab-pane label="情绪标签" name="mood"></el-tab-pane>
      </el-tabs>
    </div>
    <div id="caseRight">
      <div id="importWord">
        <!-- 条件栏 -->
        <ice-page-filter
          :query.sync="filterInfo.query"
          :filter-list="filterInfo.list"
          :list-type-info="listTypeInfo"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        />

        <!--    表格 -->
        <ice-page-table
          background
          checkBox
          :data.sync="tableInfo.data"
          :checked-list="tableInfo.checkedList"
          :refresh="tableInfo.refresh"
          :init-currentPage="tableInfo.initCurrentPage"
          :api="getListApi"
          :query="filterInfo.query"
          :field-list="tableInfo.fieldList"
          :handle="tableInfo.handle"
          @handleClick="handleClick"
          @handleEvent="handleEvent"
        >
        </ice-page-table>
      </div>
      <div id="mood">mood</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index.route',
  title: 'Tab 表格',
  data() {
    return {
      // 过滤相关配置
      filterInfo: {
        query: {
          name: '',
          tag_id: '',
          date: '',
        },
        list: [
          {
            type: 'button',
            label: '新建',
            event: 'create',
            size: 'medium',
            show: true,
          },
          {
            type: 'button',
            label: '批量暂停',
            event: 'stop',
            size: 'medium',
            show: true,
          },
        ],
      },
      // select相关列表
      listTypeInfo: {
        tagTypeList: [],
      },

      // 表格相关
      tableInfo: {
        refresh: 1,
        initCurrentPage: 1,
        data: [],
        fieldList: [
          { label: '标签名称', prop: 'name' },
          { label: '所属分类', prop: 'type', width: 250 },
          { label: '标签建立时间', prop: 'date', sortable: true, width: 300 },
          { label: '状态', prop: 'state', formatter: this.convertState },
        ],
        checkedList: [],
        handle: {
          fixed: 'right',
          label: '操作',
          width: '200',
          btList: [
            {
              label: '启用',
              type: 'text',
              event: 'start',
              show: true,
              ifRender(row) {
                return row.state === false
              },
            },
            {
              label: '编辑',
              type: 'text',
              event: 'edit',
              show: true,
            },
            {
              label: '删除',
              type: 'text',
              event: 'delete',
              show: true,
            },
          ],
        },
      },
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    tabClick(tab) {
      if (tab.name === 'importWord') {
        document.getElementById('importWord').style.display = 'block'
        document.getElementById('mood').style.display = 'none'
      } else {
        document.getElementById('importWord').style.display = 'none'
        document.getElementById('mood').style.display = 'block'
      }
    },

    convertState(row) {
      let state = row['state']
      if (state === true) {
        return '启用中'
      }
      return '暂停中'
    },

    getListApi(params) {
      return this.$http({
        url: '{baseUrl}/tab/getList',
        method: 'get',
        params,
      })
    },

    // 获取列表
    getList() {
      /*而组件内部watch字段change，重新调获取数据的接口，即可实现刷新功能*/
      // 刷新表格
      this.tableInfo.refresh = Math.random()
    },

    // 按钮点击
    handleClick(event, dataBase) {
      let { data, checkedList } = this.tableInfo
      switch (event) {
        // 创建
        case 'create':
          this.$message('新建啥东西')
          break
        // 批量暂停
        case 'stop':
          if (checkedList && checkedList.length === 0) {
            this.$message.warning('请至少选中一个标签')
            return
          }
          checkedList.forEach((item) => {
            data.map((n) => {
              if (n.name === item) {
                n.state = false
              }
              return n
            })
          })
          this.tableInfo.checkedList = []
          break
        // 启用
        case 'start':
          data.map((item) => {
            if (item.name === dataBase.name) {
              item.state = true
            }
            return item
          })
          this.$message.success({
            showClose: true,
            message: '启用中',
          })
          break
        case 'edit':
          this.$message.success('加编辑弹框哦')
          break
        // 删除
        case 'delete':
          this.$confirm(`此操作将删除 ${dataBase.name} , 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              data.map((item, index) => {
                if (dataBase.name === item.name) {
                  data.splice(index, 1)
                }
                return item
              })
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              setTimeout(() => {
                this.getList()
              }, 3000)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
          break
      }
    },

    // 触发事件
    handleEvent(event, data) {
      switch (event) {
        // 对表格获取到的数据做处理
        case 'list':
          if (!data) return
          data.forEach((item) => {
            this.$set(item, 'statusLoading', false)
          })
          break
        // 表格的复选框选中事件
        case 'tableCheck':
          this.tableInfo.checkedList = data.map((item) => item.name)
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
#caseManage {
  width: 100%;
  height: 100%;
  #caseLeft {
    position: relative;
    width: 120px;
    height: 100%;
    float: left;
  }
  #caseRight {
    margin-left: 120px;
    height: 100%;
    #importWord {
      display: block;
      height: 100%;
    }
    #mood {
      display: none;
      height: 100%;
    }
  }
}
</style>
