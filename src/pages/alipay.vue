<template>
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'alipay',
  components: { Loading, OrderHeader },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: '忆白商城',
        amount: 0.01, // 金额默认0.01元
        payType:1 // 1支付宝，2微信
      }).then((res) => {
        this.content = res.content;
        // 后端返回的表单渲染到页面需要时间，所以设置一个定时器，100ms之后再提交表单
        setTimeout(() => {
          document.forms[0].submit();
        }, 100);
      })
    }
  }
}
</script>

<style>

</style>