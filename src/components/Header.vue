<template>
  <div class="header">
    <div class="header-content">
      <div class="left-header">
        <i
          class="el-icon-platform-eleme"
          style="font-size: 50px; color: #409eff"
        ></i
        ><span class="logo-title">商城</span>
      </div>
      <div class="right-header">
        <span></span>
        <span class="login-header" @click="login()">Login</span>
        <span
          ><i class="el-icon-shopping-cart-2" style="font-size: 50px"></i
        ></span>
      </div>
    </div>
    <el-dialog
      title="Login"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {},
  props: {},
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 64) {
          callback(new Error("最大支持64位字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        pass: "",
        userName: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClose(done) {
      done();
    },
    login() {
      this.dialogVisible = true;
    },
    submit(){
      axios.post("/users/login", {
        userName: this.ruleForm.userName,
        userPwd: this.ruleForm.pass,
      }).then((response)=>{
        const res = response.data;
        this.dialogVisible = false;
        if (res.status === '0') {
          this.$message({
          message: '登录成功',
          type: 'success'
        });
        } else {
          this.$message.error(res.message);
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: white;
}
.header-content {
  width: 90%;
  height: 70px;
  margin: 0 auto;
}
.left-header {
  margin: 10px;
  float: left;
}
.logo-title {
  width: 50px;
  height: 50px;
  font-size: 24px;
  font-weight: 600;
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
}

.right-header {
  padding: 10px;
  float: right;
}
.login-header {
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;
}
</style>

