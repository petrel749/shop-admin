<template>
  <div>
    <ReportComponent></ReportComponent>
  </div>
</template>

<script>
const ReportComponent = () => import(/* webpackChunkName: "Report" */ "@c/ReportComponent.vue");
export default {
  components: {
    ReportComponent: ReportComponent
  }
};
</script>
