<template>
  <div class="cartList">
    <h1 class="mb20 mt20 cart-title"><span class="mr10">M Y </span>C A R T</h1>
    <div class="ml20" style="margin-bottom: 70px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column label="ITEMS">
          <template slot-scope="scope">
            <img
              :src="'/static/' + scope.row.productImage"
              style="width: 80px"
            />
            <span style="margin-left: 10px">{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice" label="PRICE" width="230">
        </el-table-column>
        <el-table-column label="QUANTITY" width="200">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.productNum"
              @change="handleChange(scope.row)"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="SUBTOTAL" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice * scope.row.productNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="EDIT" width="200">
          <template slot-scope="scope">
            <i
              class="el-icon-delete"
              style="font-size: 20px"
              @click="open(scope.row.productId)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-footer">
      <div class="footer-left">
        <div>
          <span class="item-total">item total:</span>
          <span class="total-price">{{totalPrice}}</span>
        </div>
      </div>
      <div class="footer-right" @click="checkout">CHECKOUT</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          price: 5666,
          quantity: 1,
          subtotal: 5666,
          name: "mi6",
        },
        {
          price: 5666,
          quantity: 1,
          subtotal: 5666,
          name: "mi6",
        },
        {
          price: 5666,
          quantity: 1,
          subtotal: 5666,
          name: "mi6",
        },
      ],
      multipleSelection: [],
      totalPrice:0
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    rowClick(row) {
      if (row.checked === "1") {
        this.$refs.multipleTable.toggleRowSelection(row, false);
      } else {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      this.handleChange(row);
      this.getTotalPrice(this.multipleSelection);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.getTotalPrice(val);
    },
    getTotalPrice(data) {
        let price = 0;
        data.forEach((ele)=>{
            if (ele.checked === '1') {
                price +=ele.productNum*ele.salePrice;
            }
        })
        this.totalPrice = price;
    },
    handleChange(item) {
      axios
        .post("/users/updateCart", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked === "1" ? "0" : "1",
        })
        .then((response) => {
            this.init();
        });
    },
    delProduct(productId) {
      axios
        .post("/users/cartDel", {
          productId: productId,
        })
        .then((response) => {
          if (response.data.status === "0") {
            this.$message({
              message: "删除商品成功",
              type: "success",
            });
            this.init();
          }
        });
    },
    init() {
      axios.get("/users/cartList").then((response) => {
        const res = response.data;
        this.tableData = res.result;
        this.initCheck(this.tableData);
      });
    },
    open(productId) {
      this.$confirm("确定要删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delProduct(productId);
        })
        .catch(() => {});
    },
    initCheck(data) {
        //表格是请求数据渲染出来的，可能那时候表格还没完全渲染完。所以要借用$nextTick
      this.$nextTick(() => {
        data.forEach((ele) => {
          const isCheck = ele.checked === "1";
          this.$refs.multipleTable.toggleRowSelection(ele, isCheck);
        });
      });
      this.getTotalPrice(data);
    },
    checkout() {
        this.$router.push({name:'Adress'});
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.cart-title {
  margin-left: 20px;
  font-size: 30px;
}
.cart-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin-top: 20px;
  height: 70px;
  line-height: 70px;
  background: white;
  border-top: 1px solid #ddd;
  z-index: 1000;
}

.footer-left {
  text-align: right;
  float: left;
  padding-right: 20px;
  width: 88%;
}
.footer-right {
  background: rgb(226, 30, 8);
  float: left;
  text-align: center;
  color: white;
  width: 10%;
  cursor: pointer;
}
.item-total {
  color: rgb(146, 143, 143);
  margin-right: 10px;
}
.total-price {
  font-size: 18px;
  color: rgb(248, 80, 51);
  font-weight: 600;
}
</style>
