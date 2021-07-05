<template>
      <div class="goods">
      <div class="menu-goods clearfix">
        <div class="menu-content">
          <span>Sort by: </span>
          <a class="sort">Default</a>
          <span
            ><a class="price">Price</a
            ><i
              class="el-icon-top"
              style="font-size: 20px; margin-left: 5px"
            ></i
          ></span>
        </div>
      </div>
      <el-container class="goods-container">
        <el-aside class="goods-left">
          <dl>
            <dt>PRICE:</dt>
            <dd>ALL</dd>
            <dd>0.00 - 100.00</dd>
            <dd>100.00 - 500.00</dd>
            <dd>500.00 - 1000.00</dd>
            <dd>1000.00 - 5000.00</dd>
          </dl>
        </el-aside>
        <el-main>
          <el-row>
            <el-col
              :span="8"
              v-for="(o) in goodsList"
              :key="o"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img
                  :src="'/static/'+ o.productImage"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>{{o.productName}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{o.salePrice}}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  components:{},
  props:{},
  data(){
    return {
        goodsList:[],
        currentDate:''
    }
  },
  watch:{},
  computed:{},
  methods:{
      getGoods() {
          axios.get('/goods').then((res) => {
              const data = res.data;
              this.goodsList = data.result.list;
              console.log(this.goodsList);
          })
      }
  },
  created(){},
  mounted(){
      this.getGoods();
  }
}
</script>
<style scoped>
.goods {
  background: #c3e9eb3d;
  padding-top: 40px;
  /* height: calc(100vh - 155px); */
}
.menu-goods {
  width: 100%;
  height: 55px;
  background: white;
  margin-bottom: 40px;
}
.menu-content {
  float: right;
  line-height: 55px;
  margin-right: 20px;
}
.price {
  font-size: 18px;
}
.price:hover {
  color: var(--active-color);
}
.sort {
  margin-right: 20px;
  color: var(--active-color);
}
.goods-container {
  margin: 0px 30px;
}

.goods-left dt {
  font-weight: 600;
  margin-bottom: 30px;
}
.goods-left dd {
  height: 26px;
  line-height: 26px;
  margin-bottom: 20px;
  padding-left: 0px;
  cursor: pointer;
}
.goods-right {
  float: right;
}
.goods-left dd:hover {
  color: var(--active-color);
  border-left: 3px solid var(--active-color);
  transition: padding-left 0.5s ease;
  padding-left: 10px;
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

