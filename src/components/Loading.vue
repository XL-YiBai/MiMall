<template>
  <div class="loading">
    <img src="/imgs/loading-svg/loading-bars.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss">
  .loading {
    height: 80px;
    line-height: 80px;
    text-align: center;
    padding: 0 30px;
    img {
      height: 100%;
    }
  }
</style>