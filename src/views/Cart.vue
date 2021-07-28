<template>
  <div class="cart">
    <Header></Header>
    <div class="nav-bread">
      <!-- <NavBread></NavBread> -->
      <el-breadcrumb separator="/" style="width: 213px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/cart">My Cart</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <CartList></CartList>
  </div>
</template>

<script>
import Header from "@/components/Header";
import CartList from "@/components/CartList";
// import NavBread from "@/components/NavBread";
export default {
    components: {
    Header,
    CartList,
    // NavBread
  },
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
.nav-bread {
  height: 45px;
  background: #eee;
}
</style>
