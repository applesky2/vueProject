<template>
  <div class="adress-list">
    <div class="adress-step">
      <el-steps :active="step" finish-status="success">
        <el-step title="Comfirm Adress"></el-step>
        <el-step title="View Your Order"></el-step>
        <el-step title="Make Payment"></el-step>
        <el-step title="Order Conformation"></el-step>
      </el-steps>
    </div>
    <div>
      <div v-if="step == 0">
        <p class="shipping-adress">SHIPING ADRESS</p>
        <div class="clearfix">
          <el-card
            class="box-card"
            v-for="(o, index) in addressListCom"
            :key="index"
            :class="{ activeColor: checkIndex == index }"
            @click.native="checkIndex = index"
          >
            <p>{{ o.userName }}</p>
            <p class="mt10">{{ o.streetName }}</p>
            <p class="mt30 mb10">{{ o.tel }}</p>
            <div>
              <a class="adress-text-default" v-if="o.isDefault"
                >Default adress</a
              >
              <a
                class="adress-text"
                v-if="!o.isDefault"
                @click="setDefault(o.addressId)"
                >Set default</a
              >
              <i
                class="el-icon-delete adress-icon"
                @click="delAddress(o.addressId)"
              ></i>
            </div>
          </el-card>
          <el-card class="box-card add-card">
            <div><i class="el-icon-plus card-icon"></i></div>
            <p>Add New Adress</p>
          </el-card>
        </div>
        <p class="shipping-more" @click="getMore">
          <span>more</span>
          <i
            :class="limit <= 3 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          ></i>
        </p>
      </div>
      <div v-if="step == 1">
        <OrderConfirm
          ref="orderConfirm"
          :addressId="addressId"
          :matchStep="matchStep"
        ></OrderConfirm>
      </div>
      <div v-if="step == 3">
        <OrderSuccess></OrderSuccess>
      </div>
    </div>
    <div class="address-footer" v-if="step != 3">
      <a @click="next">NEXT</a>
      <a @click="back" class="back" v-if="step != 0">BACK</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderConfirm from "./OrderConfirm.vue";
import OrderSuccess from "./OrderSuccess.vue";
export default {
  components: {
    OrderConfirm,
    OrderSuccess,
  },
  props: {},
  data() {
    return {
      limit: 3,
      checkIndex: 0,
      step: 0,
      addressId: "",
      orderId: "",
      addressList: [],
    };
  },
  watch: {},
  computed: {
    addressListCom() {
      return this.addressList.slice(0, this.limit);
    },
  },
  methods: {
    getAdressList() {
      axios.get("/users/addressList").then((response) => {
        const res = response.data;
        this.addressList = res.result;
      });
    },
    getMore() {
      if (this.limit == 3) {
        this.limit = this.addressList.length;
      } else {
        this.limit = 3;
      }
    },
    setDefault(addressId) {
      axios
        .post("/users/setDefault", {
          addressId,
        })
        .then((response) => {
          const res = response.data;
          if (res.status == "0") {
            this.addressId = addressId;
            this.$message({
              message: "设置默认地址成功",
              type: "success",
            });
          }
          this.getAdressList();
        });
    },
    delAddress(addressId) {
      this.$confirm("确定要删除该地址?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(addressId);
        })
        .catch(() => {});
    },
    del(addressId) {
      axios.post("/users/deleteAdress", { addressId }).then((response) => {
        const res = response.data;
        if (res.status == "0") {
          this.getAdressList();
          this.$message({
            message: "删除地址成功",
            type: "success",
          });
        }
      });
    },
    next() {
      this.step++;
      this.$router.push({ path: `/adress/step=${this.step}&orderId=null` });
      if (this.step == "2") {
        this.$refs.orderConfirm.payment();
      }
    },
    back() {
      this.step--;
      this.$router.push({ path: `/adress/step=${this.step}&orderId=null` });
    },
    matchStep() {
      this.step = Number(this.$route.params.step);
    },
  },
  created() {},
  mounted() {
    this.step = Number(this.$route.params.step);
    this.getAdressList();
  },
};
</script>
<style scoped>
.adress-step {
  margin: 40px 20px;
}
.box-card {
  width: 24%;
  float: left;
  margin: 10px 5px;
  cursor: pointer;
}
.box-card:hover {
  border: 2px solid var(--active-color);
}
.shipping-adress {
  margin-left: 5px;
  margin-bottom: 10px;
  font-weight: 600;
  color: rgb(97, 94, 94);
}
.adress-text {
  font-size: 14px;
  cursor: pointer;
  color: transparent;
}
.adress-text-default {
  font-size: 14px;
  cursor: pointer;
  color: tomato;
}
.adress-text:hover {
  color: tomato;
}
.adress-icon {
  float: right;
}
.add-card {
  height: 154px;
  text-align: center;
  color: rgb(114, 112, 112);
  cursor: pointer;
}
.card-icon {
  font-size: 60px;
  color: rgb(114, 112, 112);
  margin-bottom: 20px;
  margin-top: 10px;
}
.shipping-more {
  height: 24px;
  text-align: center;
  color: salmon;
  margin: 10px 0px;
  cursor: pointer;
}
.activeColor {
  border: 2px solid var(--active-color);
}
.address-footer {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.address-footer a {
  float: right;
  height: 40px;
  width: 200px;
  line-height: 40px;
  background: salmon;
  text-align: center;
  margin-right: 5px;
  margin-bottom: 5px;
  color: white;
  cursor: pointer;
}
.address-footer .back {
  background: white;
  border: 1px solid rgb(131, 129, 129);
  color: rgb(56, 55, 55);
  float: left;
  margin-left: 5px;
}
</style>
