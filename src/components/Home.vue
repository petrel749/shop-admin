<template>
  <el-button type="info" @click="logOut">退出</el-button>
</template>

<script>
export default {
  methods: {
    logOut: function() {
      setTimeout(() => {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped></style>
