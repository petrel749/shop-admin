<template>
  <div>
    <ParamsComponent></ParamsComponent>
  </div>
</template>

<script>
const ParamsComponent = () =>
  import(/* webpackChunkName: "Params" */ "@c/goods/params/ParamsComponent.vue");
export default {
  components: {
    ParamsComponent: ParamsComponent
  }
};
</script>

<style lang="scss" scoped></style>
