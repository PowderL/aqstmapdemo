<template>
  <div id="app">
    <div id="navi-bar">
      <div class="log-image">
        <img src="../static/aqstmap/logo/logo.png" alt="" height="60px">
      </div>
      <div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/aqstmap/mapdemo">动态展示</el-menu-item>
          <el-submenu index="3">
            <template slot="title">污染时段</template>
            <el-menu-item index="31" @click='selectCityPollutant("concernedperiod", "chengdu")'>成都</el-menu-item>
            <el-menu-item index="32" @click='selectCityPollutant("concernedperiod", "zigong")'>自贡</el-menu-item>
            <el-menu-item index="33" @click='selectCityPollutant("concernedperiod", "yibin")'>宜宾</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">地图展示</template>
            <!-- <el-menu-item index="21" @click='selectCity("plot", "chengdu")'>成都</el-menu-item> -->
            <el-submenu index="21">
              <template slot="title">成都</template>
              <el-menu-item index="211" @click='selectCityPollutant("plot", "chengdu", "pm2_5")'>PM<sub>2.5</sub></el-menu-item>
              <el-menu-item index="212" @click='selectCityPollutant("plot", "chengdu", "pm10")'>PM<sub>10</sub></el-menu-item>
              <el-menu-item index="213" @click='selectCityPollutant("plot", "chengdu", "o3")'>O<sub>3</sub></el-menu-item>
              <el-menu-item index="214" @click='selectCityPollutant("plot", "chengdu", "no2")'>NO<sub>2</sub></el-menu-item>
              <el-menu-item index="215" @click='selectCityPollutant("plot", "chengdu", "so2")'>SO<sub>2</sub></el-menu-item>
              <el-menu-item index="216" @click='selectCityPollutant("plot", "chengdu", "co")'>CO</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="22" @click='selectCity("plot", "zigong")'>自贡</el-menu-item> -->
            <el-submenu index="22">
              <template slot="title">自贡</template>
              <el-menu-item index="221" @click='selectCityPollutant("plot", "zigong", "pm2_5")'>PM<sub>2.5</sub></el-menu-item>
              <el-menu-item index="222" @click='selectCityPollutant("plot", "zigong", "pm10")'>PM<sub>10</sub></el-menu-item>
              <el-menu-item index="223" @click='selectCityPollutant("plot", "zigong", "o3")'>O<sub>3</sub></el-menu-item>
              <el-menu-item index="224" @click='selectCityPollutant("plot", "zigong", "no2")'>NO<sub>2</sub></el-menu-item>
              <el-menu-item index="225" @click='selectCityPollutant("plot", "zigong", "so2")'>SO<sub>2</sub></el-menu-item>
              <el-menu-item index="226" @click='selectCityPollutant("plot", "zigong", "co")'>CO</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="23" @click='selectCity("plot", "yibin")'>宜宾</el-menu-item> -->
            <el-submenu index="23">
              <template slot="title">宜宾</template>
              <el-menu-item index="231" @click='selectCityPollutant("plot", "yibin", "pm2_5")'>PM<sub>2.5</sub></el-menu-item>
              <el-menu-item index="232" @click='selectCityPollutant("plot", "yibin", "pm10")'>PM<sub>10</sub></el-menu-item>
              <el-menu-item index="233" @click='selectCityPollutant("plot", "yibin", "o3")'>O<sub>3</sub></el-menu-item>
              <el-menu-item index="234" @click='selectCityPollutant("plot", "yibin", "no2")'>NO<sub>2</sub></el-menu-item>
              <el-menu-item index="235" @click='selectCityPollutant("plot", "yibin", "so2")'>SO<sub>2</sub></el-menu-item>
              <el-menu-item index="236" @click='selectCityPollutant("plot", "yibin", "co")'>CO</el-menu-item>
            </el-submenu>
          </el-submenu>
         <el-menu-item index="/aqstmap/projectintroduction">项目介绍</el-menu-item>
        </el-menu>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    selectCityPollutant (route, city, pollutant = '') {
      if (route === 'plot') {
        this.$router.push({
          path: '/aqstmap/plotdemo',
          query: {
            city: city,
            pollutant: pollutant
          }
        })
      };
      if (route === 'concernedperiod') {
        this.$router.push({
          path: '/aqstmap/concernedperioddemo',
          query: {
            city: city
          }
        })
      };
    }
  },
  // created () {
  //   this.$router.push({
  //     path: '/mapdemo'
  //   })
  // }
}
</script>
<style>
@import url("./style/base.css");
</style>
