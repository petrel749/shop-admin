<template>
  <div>
    <CateComponent></CateComponent>
  </div>
</template>

<script>
const CateComponent = () => import(/* webpackChunkName: "Cate" */ "@c/goods/cate/CateComponent");
export default {
  components: {
    CateComponent: CateComponent
  }
};
</script>
