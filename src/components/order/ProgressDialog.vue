<template>
  <div>
    <!-- 展示物流进度对话框 -->
    <el-dialog title="查看物流进度" :visible.sync="progressDialogVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
          >{{ activity.context }}</el-timeline-item
        >
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["progressInfo"],
  data() {
    return {
      progressDialogVisible: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
