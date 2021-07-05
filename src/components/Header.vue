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
          <span class="login-header">Login</span>
          <span
            ><i class="el-icon-shopping-cart-2" style="font-size: 50px"></i
          ></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
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
}
</style>

