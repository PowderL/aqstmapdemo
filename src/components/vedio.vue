<template>
    <div class="block-box-player">
      <!-- <happy-scroll color="rgba(0,0,0,0.5)" size="5"> -->
        <div class="vedio-container">
          <p v-html="title"></p>
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsline="false" :options="playerOptions"></video-player>
        </div>
      <!-- </happy-scroll> -->
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Video',
  data () {
      return ({
        display: {o3: 'O<sub>3</sub>', pm2_5: 'PM<sub>2.5</sub>'},
        pollutionPeriod:[
            '2020年01月',
            '2020年04月',
            '2020年05月',
            '2020年08月',
            '2021年07月',
            '2021年08月',
            '2021年12月'
        ]
    })
  },
  computed: {
    title () {
        return (this.pollutionPeriod[Number(this.activeIndex) - 1] + '污染过程' + this.display[this.currentMainPollutant] + '叠加风场动态变化')
    },
    playerOptions () {
        var baseOptions = {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        poster: '../static/aqstmap/icon/play.png', // 你的封面地址
        // width: '400', // 播放器宽度
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: '../static/aqstmap/mp4/' + this.city + '/' + this.activeIndex + '.mp4' // url地址
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
      // console.log(this.city)
     return (baseOptions)
    }
  },
  props: {
    activeIndex: {
        type: String,
        required: true
  },
    city: {
      type: String,
      required: true
  },
    currentMainPollutant: {
      type: String,
      required: true
  }
  },
  watch: {
      activeIndex: function(newValue, oldValue){
          this.activeIndex = newValue
      },
      city: function(newValue, oldValue) {
          this.city = newValue
      },
      currentMainPollutant: function(newValue, oldValue) {
          this.currentMainPollutant = newValue
      }
  }
}
</script>

<style>

</style>