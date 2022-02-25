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
    this.getUser();
    this.getCartCount();
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.axios.get('/user').then(() => {
        // todo  数据保存到vuex中
      })
    },
    // 获取商品购物车数量
    getCartCount() {
      this.axios.get('/carts/products/sum').then(() => {
        // todo  数据保存到vuex中
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
