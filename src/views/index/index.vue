<template>
  <el-container class="index-container">
    <el-header>
      <div class="title">
        后台管理系统
      </div>
      <el-button
        type="info"
        @click="layout"
      >退出</el-button>
    </el-header>
    <el-container>

      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div
          class="toggle-btn"
          @click="toggleCollapse"
        >|||</div>
        <el-menu
          unique-opened
          background-color="#333744"
          text-color="#fff"
          :router="true"
          :collapse="isCollapse"
          :default-active="$route.path"
          :collapse-transition="false"
          active-text-color="#409bff"
        >
          <template v-for="(item, i) in menuList">
            <!-- 无子菜单的导航栏 -->
            <el-menu-item
              v-if="!item['children']"
              :index="item['id'].toString()"
              :key="i"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
            </el-menu-item>

            <!-- 有二级菜单的导航栏 -->
            <el-submenu
              v-else
              :index="item['id'].toString()"
              :key="i"
            >
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + children['path']"
                :key="l"
                v-for="(children, l) in item['children']"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ children.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from '@/api/menus'
export default {
  name: 'Index',
  data() {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  methods: {
    // 退出
    layout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单列表
    getMenuList() {
      getMenuList().then(res => {
        console.log('res', res)
        this.menuList = res.data
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 折叠菜单
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #373d41;
  .title {
    color: #ffffff;
  }
}
.el-aside {
  background: #333744;
  .el-menu {
    border-right: none;
  }
  .toggle-btn {
    background: #4a5064;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    letter-spacing: 0.2em;
    color: #ffffff;
    cursor: pointer;
  }
}
.el-main {
  background: #eaedf1;
}
.index-container {
  height: 100vh;
}
</style>
