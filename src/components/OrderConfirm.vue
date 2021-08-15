<template>
  <div class="order-confirm">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="ORDER CONTENTS">
        <template slot-scope="scope">
          <img :src="'/static/' + scope.row.productImage" style="width: 80px" />
          <span style="margin-left: 10px">{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="PRICE" width="230">
      </el-table-column>
      <el-table-column label="QUANTITY" width="200">
        <template slot-scope="scope">
          <span class="product-num">{{ "x" + scope.row.productNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SUBTOTAL" width="250">
        <template slot-scope="scope">
          <span style="color: red">{{
            (scope.row.salePrice * scope.row.productNum) | currency("$")
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="order-form clearfix">
      <el-form
        :label-position="labelPosition"
        label-width="200px"
        :model="formLabelAlign"
        style="float: right; margin-right: 20px; font-weight: 600"
      >
        <el-form-item label="Item subtotal:">
          <span>{{ formLabelAlign.subtotal | currency("$") }}</span>
        </el-form-item>
        <el-form-item label="Shipping:">
          <span>{{ formLabelAlign.shipping | currency("$") }}</span>
        </el-form-item>
        <el-form-item label="Discount:">
          <span>{{ formLabelAlign.discount | currency("$") }}</span>
        </el-form-item>
        <el-form-item label="Tax:">
          <span>{{ formLabelAlign.tax | currency("$") }}</span>
        </el-form-item>
        <el-form-item label="Order total:">
          <span>{{ formLabelAlign.total | currency("$") }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { currency } from "../utils/currency";
export default {
  components: {},
  props: {
    addressId: String,
    matchStep: Function
  },
  data() {
    return {
      tableData: [],
      labelPosition: "right",
      formLabelAlign: {
        subtotal: 0,
        shipping: 100,
        discount: 200,
        tax: 400,
        total: 0,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    init() {
      axios.get("/users/cartList").then((response) => {
        const res = response.data;
        const dataFilter = [];
        res.result.forEach((item) => {
          if (item.checked === "1") {
            dataFilter.push(item);
            this.formLabelAlign.subtotal += item.salePrice * item.productNum;
          }
        });
        this.formLabelAlign.total =
          this.formLabelAlign.subtotal +
          this.formLabelAlign.shipping +
          this.formLabelAlign.tax -
          this.formLabelAlign.discount;
        this.tableData = dataFilter;
      });
    },
    payment() {
      axios
        .post("/users/payment", {
          addressId: this.addressId,
          orderTotal: this.formLabelAlign.total,
        })
        .then((response) => {
          let res = response.data;
          if (res.status == "0") {
              this.$router.push({ path: `/adress/step=3&orderId=${res.result.orderId}` });
              this.matchStep();
          }
        });
    },
  },
  filters: {
    currency: currency,
  },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.product-num {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #999;
  text-align: center;
}
.order-confirm {
  margin-bottom: 70px;
}
.order-form {
  margin-top: 20px;
}
</style>
