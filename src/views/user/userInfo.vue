<template>
  <div class="userInfo-wrap">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeDialog"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    closeDialog() {
      console.log('关闭')
      this.$emit('update:dialogFlag', false)
    }
  },
  watch: {
    dialogFlag: {
      handler(newValue) {
        console.log(newValue)
        this.dialogVisible = newValue
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
