<template>
  <div>
    <AddGoodComponent></AddGoodComponent>
  </div>
</template>

<script>
const AddGoodComponent = () =>
  import(/* webpackChunkName: "List" */ "@c/goods/list/AddGoodComponent.vue");
export default {
  components: {
    AddGoodComponent: AddGoodComponent
  }
};
</script>
