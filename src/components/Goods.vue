<template>
  <div class="goods">
    <div class="menu-goods clearfix">
      <div class="menu-content">
        <span>Sort by: </span>
        <a class="sort">Default</a>
        <span
          ><a class="price">Price</a
          ><i class="el-icon-top" style="font-size: 20px; margin-left: 5px"></i
        ></span>
      </div>
    </div>
    <el-container class="goods-container">
      <el-aside class="goods-left">
        <dl>
          <dt>PRICE:</dt>
          <dd
            v-for="item in priceList"
            :key="item"
            @click="selectPrice(item.id)"
            :class="{ 'active-price': activePrice === item.id }"
          >
            {{ item.label }}
          </dd>
        </dl>
      </el-aside>
      <el-main>
        <el-row :gutter="8">
          <el-col :span="6" v-for="o in goodsList" :key="o">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="'/static/' + o.productImage" class="image" />
              <div style="padding: 14px">
                <span
                  ><b>{{ o.productName }}</b></span
                >
                <div class="bottom clearfix">
                  <span class="sale-price">{{ o.salePrice }}￥</span>
                  <el-button type="text" class="button">加入购物车</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="8"
          layout="sizes, prev, pager, next"
          :total="17"
        >
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {},
  data() {
    return {
      goodsList: [],
      currentDate: "",
      activePrice: "0",
      currentPage: 1,
      model:{
        page: 1,
        pageSize: 8,
        sort: 1
      },
      priceList: [
        {
          id: "0",
          label: "ALL",
        },
        {
          id: "1",
          label: "0.00 - 100.00",
        },
        {
          id: "2",
          label: "100.00 - 500.00",
        },
        {
          id: "3",
          label: "500.00 - 1000.00",
        },
        {
          id: "4",
          label: "1000.00 - 5000.00",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    getGoods() {
      axios.get("/goods",{
        params: this.model
      }).then((res) => {
        const data = res.data;
        this.goodsList = data.result.list;
        console.log(this.goodsList);
      });
    },
    selectPrice(id) {
      this.activePrice = id || "0";
    },
    handleSizeChange(val) {
      this.model.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.model.page = val;
      this.getGoods();
    }

  },
  created() {},
  mounted() {
    this.getGoods();
  },
};
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
.goods-left .active-price {
  border-left: 3px solid var(--active-color);
  color: var(--active-color);
  padding-left: 10px;
}
.sale-price {
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 123, 0, 0.801);
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
  clear: both;
}
.el-col {
  margin-bottom: 8px;
}
.el-button {
  border: 1px solid var(--active-color);
  border-radius: 4px;
  padding: 4px;
}
.el-pagination {
  border-radius: 6px;
  background: white;
}
</style>

