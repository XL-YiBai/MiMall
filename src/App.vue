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
      res: {}
    }
  },
  mounted() {
    // 本地加载请求静态json文件的格式
    // this.axios.get('/mock/user/login.json').then((res) => {
    //   this.res = res;
    // });
    // 通过easy-mock平台实现数据mock(这个平台经常因为访问人数多崩掉，推荐公司内自己搭建)
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res;
    // });
    // 本地集成mockjs实现数据mock（本质没有发出请求，但是能正常获取到数据）
    this.axios.get('/user/login').then((res)=>{
      this.res = res;
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
