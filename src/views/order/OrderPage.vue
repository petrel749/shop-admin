<template>
  <div><OrderComponent></OrderComponent></div>
</template>

<script>
const OrderComponent = () => import(/* webpackChunkName: "Order" */ "@c/order/OrderComponent.vue");
export default {
  components: {
    OrderComponent: OrderComponent
  }
};
</script>

<style lang="scss" scoped></style>
