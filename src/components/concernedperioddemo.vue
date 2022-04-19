<template>
    <div>
        <div>
            <div class="leaf-bar">
            <!-- <happy-scroll color="rgba(0,0,0,0.5)" size="5" hide-horizontal> -->
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-left"
                    mode="vertical"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1" @click="selectPeriod('1')">2020年01月污染时段</el-menu-item>
                    <el-menu-item index="2" @click="selectPeriod('2')">2020年04月污染时段</el-menu-item>
                    <el-menu-item index="3" @click="selectPeriod('3')">2020年05月污染时段</el-menu-item>
                    <el-menu-item index="4" @click="selectPeriod('4')">2020年08月污染时段</el-menu-item>
                    <el-menu-item index="5" @click="selectPeriod('5')">2021年07月污染时段</el-menu-item>
                    <el-menu-item index="6" @click="selectPeriod('6')">2021年08月污染时段</el-menu-item>
                    <el-menu-item index="7" @click="selectPeriod('7')">2021年12月污染时段</el-menu-item>
                </el-menu>
            <!-- </happy-scroll> -->
            </div>
        </div>
        <component-box :activeIndex="activeIndex" :city="city" :currentMainPollutant="currentMainPollutant"></component-box>
    </div>
</template>
<script>
/* eslint-disable */
import vedioComponent from "./vedio.vue"
export default {
  data () {
    return ({
      city: this.$route.query.city,
      activeIndex: '1',
      mainPollutants: ["pm2_5", "o3", "o3", "o3", "o3", "o3", "pm2_5"],
      currentMainPollutant: "pm2_5"
      })
  },
  methods: {
    selectPeriod (i) {
      this.activeIndex = i
      this.currentMainPollutant = this.mainPollutants[Number(i) - 1]
    }
  },
  components: {
    "component-box": vedioComponent
  }
}
</script>
<style>
@import url("../style/concernedperioddemo.css");
</style>
<style>
.happy-scroll-container .happy-scroll-content{
  /* 解决横向滚动差 20px 的问题 */
  display: block;
}
</style>