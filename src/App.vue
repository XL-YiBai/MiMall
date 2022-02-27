<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      
    }
  },
  mounted() {
    // 判断是否是登录状态，登陆状态才获取用户和购物车信息
    if (this.$cookie.get('userId')) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.axios.get('/user').then((res={}) => {
        this.$store.dispatch('saveUserName', res.username);
      })
    },
    // 获取商品购物车数量
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res=0) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss'; 
@import './assets/scss/config.scss'; 
@import './assets/scss/button.scss'; 
</style>
