<template>
  <div class="order-success">
    <div class="el-icon-success order-success-icon"></div>
    <p class="congratulations mt20">Congratulations!</p>
    <p class="congratulations">You order is under processing!</p>
    <div class="success-order-detail">
      <span>Order ID: {{ orderIds }}</span>
      <span class="order-detail-total"
        >Order total: {{ orderTotal | currency($) }}</span
      >
    </div>
    <div class="order-btn mt20">
      <el-button @click.native="goTo('cart')">CART LIST</el-button>
      <el-button @click.native="goTo('goods')">GOODS LIST</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { currency } from "./../utils/currency";
export default {
  components: {},
  props: {},
  data() {
    return {
      orderTotal: 0,
      orderIds: "",
    };
  },
  watch: {},
  computed: {},
  filters: {
    currency: currency,
  },
  methods: {
    init() {
      const orderId = this.$route.params.orderId;
      axios
        .get("/users/orderDetail", {
          params: {
            orderId: orderId,
          },
        })
        .then((response) => {
          const res = response.data;
          if (res.status == "0") {
            this.orderIds = orderId;
            this.orderTotal = res.result.orderTotal;
          }
        });
    },
    goTo(val) {
      if (val == "cart") {
        this.$router.push({
          path: '/cart',
        });
      } else {
         this.$router.push({
          name: 'GoodList',
        }); 
      }
    },
  },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.order-success {
  text-align: center;
}
.order-success-icon {
  color: rgb(31, 207, 134);
  font-size: 70px;
}
.success-order-detail {
  /* width: 400px; */
  margin: 20px auto;
  color: rgb(179, 170, 170);
}

.order-detail-total {
  margin-left: 20px;
}
.congratulations {
  margin-bottom: 10px;
  font-size: 20px;
  color: grey;
}
.order-btn .el-button {
  color: indianred;
  border: 1px solid indianred;
  width: 160px;
}
</style>
