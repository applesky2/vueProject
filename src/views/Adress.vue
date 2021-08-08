<template>
  <div class="adress">
    <Header></Header>
    <div class="nav-bread">
      <!-- <NavBread></NavBread> -->
      <el-breadcrumb separator="/" style="width: 213px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/adress">Adress</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <AdressList></AdressList>
  </div>
</template>

<script>
import AdressList from '../components/AdressList.vue'
import Header from '../components/Header.vue'
export default {
  components:{
      AdressList,
      Header
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
