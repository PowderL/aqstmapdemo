<template>
    <div class="main-demo">
        <happy-scroll color="rgba(0,0,0,0.5)" size="8" resize hide-horizontal>
            <div v-infinite-scroll="load" infinite-scroll-disabled="disabled"  infinite-scroll-distance="20"   class="videoLister">
                <div class="demo-image" v-for="(item1, key1) in dateTimeList" :key="key1">
                    <div class="block" v-for="value in item1.data" :key="value">
                        <el-image
                        style="width: 118px; height: 118px; padding: 1px 2px;"
                        :src="mainPath + '/' + item1.name + '/' + value + '.png'"
                        lazy
                        fit="fill"
                        :preview-src-list="genPrsList(item1.name)"></el-image>
                    </div>
                    <span style="display: block;">{{key1}}</span>
                    <el-divider></el-divider>
                </div>
                <div v-if="loading" style="margin-top:10px;" class="loading">
                    <span></span>
                </div>
            </div>
        </happy-scroll>
    </div>
</template>
<script>
/*eslint-disable*/
import { InfiniteScroll } from "element-ui"
export default ({
    directives: {
        	"infinite-scroll": InfiniteScroll,
     },
  data () {
    return ({
      dateList: {},  //渲染数据数组
      dateTimeList: {},
      loading: false  //加载时的动画
    })
  },
  methods: {
    load() {
        //滑到底部时进行加载
        this.loading = true;
        setTimeout(() => {
            this.dateList = this.genDateList(3)
            this.genDateTimeList(this.dateList)
            this.loading = false
        }, 1500);
    },
    genDateList (numDay) {
      var dateListTemp = []
      var dateIndex = 0
      var maxIndex = 0
      if ((this.presentDate.getTime() - new Date("2020-01-01").getTime()) / 3600 / 1000 < numDay * 24) {
        maxIndex = Math.round((this.presentDate.getTime() - new Date("2020-01-01").getTime()) / 3600 / 1000 / 24)
      } else {
        maxIndex = numDay
      }
      while (dateIndex < maxIndex) {
        var month = this.presentDate.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        var day = this.presentDate.getDate()
        if (day < 10) {
          day = '0' + day
        }
        var dateStr = this.presentDate.getFullYear() + '-' + month + '-' + day
        dateListTemp.push(dateStr)
        dateIndex++
        this.presentDate.setTime(this.presentDate.getTime() - 1 * 3600 * 24 * 1000)
      }
      return (dateListTemp)
    },
    genDateTimeList (dateList) {
      var timeList = []
      var i = 0
      while (i < 24) {
        if (i < 10) {
          timeList.push('0' + i + ':00:00')
        } else {
          timeList.push(i + ':00:00')
        }
        i++
      }
      var timeListTemp = []
      var bridge = {}
      for (i = 0; i < dateList.length; i++) {
        bridge = {}
        timeListTemp = []
        for (var j = 0; j < 24; j++) {
          timeListTemp[j] = dateList[i] + ' ' + timeList[j]
        }
        bridge['data'] = timeListTemp
        bridge['name'] = dateList[i]
        this.dateTimeList[dateList[i]]=bridge
      }
    },
    genPrsList (date) {
      var timeList = []
      var i = 0
      while (i < 24) {
        if (i < 10) {
          timeList.push('0' + i + ':00:00')
        } else {
          timeList.push(i + ':00:00')
        }
        i++
      }
      var prsList = []
      for (i = 0; i < 24; i++){
        prsList[i] = this.mainPath + "/" + date + "/" + date + " " +  timeList[i] + ".png"
      }
      return (prsList)
    },
  },
  created () {
    this.dateList = this.genDateList(7)
    this.genDateTimeList(this.dateList)
  },
  computed: {
    mainPath () {
      return ("../../static/aqstmap/plotdemo/" + this.$route.query.city + "/" + this.$route.query.pollutant)
    },
    noMore() {
         //当起始页数大于总页数时停止加载
         return new Date(this.presentDate) < new Date("2020-01-01")
      },
    disabled() {
         return this.loading || this.noMore;
      },
    presentDate () {
      var dateNow = new Date()
      var dateYes = dateNow.getTime() - 1000 * 3600 * 24
      dateNow.setTime(dateYes)
      return (dateNow)
    },
    dateInput: {
      get () {
        var dateNow = new Date()
        var dateYes = dateNow.getTime() - 1000 * 3600 * 24
        dateNow.setTime(dateYes)
        this.presentDate = dateNow
       
      },
      set (value) {
        if (value == null) {
          var dateNow = new Date()
          var dateYes = dateNow.getTime() - 1000 * 3600 * 24
          dateNow.setTime(dateYes)
          this.presentDate = dateNow
          
        } else {
          this.presentDate = new Date(value)
          
        }
      }
    }
  }
})
</script>
<style scoped>
@import url("../style/plotdemo.css");
</style>
