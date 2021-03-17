<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入用户名字"
            class="input-with-select"
            v-model="searchUserInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addUserInfo"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="usersList"
        border
        stripe
        :header-cell-style="{'text-align':'center'}"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色种类"
        >
        </el-table-column>
        <el-table-column label="用户状态">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.mg_state"
              @change="changeState(scoped.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130px"
        >
          <template v-slot="scoped">
            <!-- 修改 -->
            <el-button
              icon="el-icon-edit"
              circle
              type="primary"
              size="mini"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              circle
              type="danger"
              size="mini"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                icon="el-icon-setting"
                circle
                type="warning"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchUserInfo.pagenum"
        :page-sizes="[2, 3, 5, 20]"
        :page-size="searchUserInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <user-info :dialogFlag.sync="dialogFlag"></user-info>
  </div>
</template>

<script>
import { getUserInfo, changeUserState } from '@/api/user'
import userInfo from './userInfo'
export default {
  name: 'UserIndex',
  components: {
    userInfo
  },
  data() {
    return {
      dialogFlag: false,
      searchUserInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      usersList: [],
      total: 0
    }
  },
  methods: {
    // 获取用户数据
    getUserList() {
      getUserInfo(this.searchUserInfo).then(res => {
        console.log('ress', res)
        this.usersList = res.data.users
        this.total = res.data.total
      }).catch(err => {
        console.log('err', err)
      })
    },
    addUserInfo() {
      console.log('添加用户')
      console.log('查看数据', this.dialogFlag)
      this.dialogFlag = true
    },
    // 改变用户状态
    changeState(params) {
      changeUserState(params.id, params.mg_state).then(res => {
        console.log('res', res)
        this.$message({
          type: 'success',
          message: res.meta.msg
        })
      }).catch(err => {
        console.log('err', err)
        this.$message({
          type: 'error',
          message: '更新用户状态失败'
        })
      })
    },
    // 每页条数改变
    handleSizeChange(val) {
      console.log('每页条数', val)
      this.searchUserInfo.pagesize = val
      this.getUserList()
    },
    // 页码改变触发
    handleCurrentChange(val) {
      console.log('页码改变', val)
      this.searchUserInfo.pagenum = val
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>
</style>
