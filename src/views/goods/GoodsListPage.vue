<template>
  <div><GoodsListComponent></GoodsListComponent></div>
</template>

<script>
const GoodsListComponent = () =>
  import(/* webpackChunkName: "List" */ "@c/goods/list/GoodsListComponent.vue");
export default {
  components: {
    GoodsListComponent: GoodsListComponent
  }
};
</script>

<style lang="scss" scoped></style>
