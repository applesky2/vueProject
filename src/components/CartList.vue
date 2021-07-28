<template>
  <div class="cartList">
    <h1 class="mb20 mt20 cart-title"><span class="mr10">M Y </span>C A R T</h1>
    <div class="ml20" style="margin-bottom: 70px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
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
              @change="handleChange"
              :min="1"
              :max="10"
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
          <template>
            <i class="el-icon-delete" style="font-size: 20px"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-footer">
      <div class="footer-left">
        <div>
          <span class="item-total">item total:</span>
          <span class="total-price">2499</span>
        </div>
      </div>
      <div class="footer-right">CHECKOUT</div>
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange() {},
    init() {
      axios.get("/users/cartList").then((response) => {
        const res = response.data;
        this.tableData = res.result;
      });
    },
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
