<template>
  <div class="login-wrap">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" />
      </div>
      <el-form
        ref="loginForm"
        :model="loginData"
        label-width="0px"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
          <el-button
            type="info"
            @click="restForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单 -->
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    restForm() {
      this.$refs['loginForm'].resetFields()
    },
    login() {
      this.$refs['loginForm'].validate(validate => {
        if (!validate) return false
        login(this.loginData).then(res => {
          this.$message.success(res.meta.msg)
          this.$router.push({ path: '/index' })
          console.log('res', res)
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  height: 100vh;
  background: #2b4b6b;
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background: #ffffff;
    border-radius: 3px;
    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      padding: 10px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      box-shadow: 0 0 10px #dddddd;
      background: #ffffff;
      img {
        border-radius: 50%;
        background: #eeeeee;
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .login-btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
