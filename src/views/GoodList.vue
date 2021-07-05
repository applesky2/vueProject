<template>
  <div class="wrapper">
    <Header></Header>
    <div class="nav-bread">
      <el-breadcrumb separator="/" style="width: 213px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">Goods</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Goods></Goods>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Goods from "@/components/Goods";
export default {
  components: {
    Header,
    Goods
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.nav-bread {
  height: 45px;
  background: #eee;
}
</style>