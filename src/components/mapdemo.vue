<template>
  <div id="mapwindow" @click="hidePop()">
    <div id="map"></div>
    <div class="location-button">
      <button class="button-b" v-on:click.stop="popHidePop('location')">
        <span class="button-icon">
          <img
            src="../../static/aqstmap/icon/location.png"
            alt=""
            width="20"
            height="20"
          />
        </span>
        <span class="button-text">{{ locationArray[location] }}</span>
      </button>
    </div>
    <div class="location" v-show="locationShow" @click.stop>
      <el-button-group>
        <el-button plain v-on:click="clickLocation('chengdu')">成都</el-button>
        <el-button plain v-on:click="clickLocation('zigong')">自贡</el-button>
        <el-button plain v-on:click="clickLocation('yibin')">宜宾</el-button>
      </el-button-group>
    </div>
    <div class="pollutant-button">
      <button
        type="button"
        class="button-b"
        v-on:click.stop="popHidePop('pollutant')"
      >
        <span class="button-icon">
          <img
            src="../../static/aqstmap/icon/pollutant.png"
            alt=""
            width="20"
            height="20"
          />
        </span>
        <span class="button-text" v-html="pollutantHtmlArray[pollutant]">
        </span>
      </button>
    </div>
    <div class="pollutant" v-show="pollutantShow" @click.stop>
      <el-button-group>
        <el-button plain v-on:click="clickPollutant('pm2_5')" v-html="pollutantHtmlArray.pm2_5"></el-button>
        <el-button plain v-on:click="clickPollutant('pm10')" v-html="pollutantHtmlArray.pm10"></el-button>
        <el-button plain v-on:click="clickPollutant('o3')" v-html="pollutantHtmlArray.o3"></el-button>
        <el-button plain v-on:click="clickPollutant('no2')" v-html="pollutantHtmlArray.no2"></el-button>
        <el-button plain v-on:click="clickPollutant('co')" v-html="pollutantHtmlArray.co"></el-button>
        <el-button plain v-on:click="clickPollutant('so2')" v-html="pollutantHtmlArray.so2"></el-button>
      </el-button-group>
    </div>
    <div class="calender-button">
      <button
        type="button"
        class="button-b"
        v-on:click.stop="popHidePop('calender')"
       style="width:360px;">
        <span class="button-icon">
          <img src="../../static/aqstmap/icon/calender.png" alt="" width="20" height="20"/>
        </span>
        <span class="button-text">时间：{{dateTimeRange}}</span>
      </button>
    </div>
    <div class="calender" v-show="calenderShow" @click.stop>
      <div style="position: relative; width: 580px;">
        <button @click.stop="calenderShow=false"
          style="width: 20px;height: 20px;cursor: pointer;position: absolute;right: 10px;top: 10px;background-color:rgb(255, 255, 255); border:0px;">
          <img src="../../static/aqstmap/icon/out.png" alt="" width="20" height="20"
            style="position: relative; right: 7px; bottom: 2px"/>
        </button>
      </div>
      <div class="calender-datetime calender-begin">
        <span class="calender-text">开始：</span>
        <el-date-picker
        v-model="dateBeginInput"
        type="date"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions1"
        placeholder="选择日期">

        </el-date-picker>
        <el-time-select
          v-model="timeBeginInput"
          format="HH:mm"
          value-format="HH:mm"
          editable=false
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00',
            editable: false,
            readonly:true,
            maxTime: maxTime
      }"
        >
        </el-time-select>
      </div>
      <div class="calender-datetime calender-end">
        <span class="calender-text">结束：</span>
        <el-date-picker v-model="dateEndInput" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions2">
        </el-date-picker>
        <el-time-select
          v-model="timeEndInput"
          :minTime="minTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00',
            minTime: minTime
          }"
        >
        </el-time-select>
      </div>
    </div>
    <div class="play-button">
      <button type="button" class="button-b play-b" @click="clickPlay()">
        <span>
          <img v-bind:src="playIcon" alt="" width="40" height="40" />
        </span>
      </button>
    </div>
    <div style="position:absolute;top:92%;left:7%;">
    <div class="play timeline" @mousemove="moveTip" @mouseover="showMoveTip = true" @mouseleave="showMoveTip = false" @click.stop="clickTimeBar">
      <div class="timelinePanel"></div>
      <div class="processBar" :style="{width: Math.round(currentTipX) + 'px'}"></div>
    </div>
        <div class="curtime tooltip" :style="{left: Math.round(currentTipX) - 78 + 'px'}">{{currentTime}}</div>
        <div class="tooltip" :style="{left: tooltipX + 'px'}" v-show="showMoveTip">{{pointerTime}}</div>
    </div>
    <div class="colorBar" style="position:absolute;left:50%;top:92%;width:50%">
        <img :src="colorBar" alt="" style="width:100%;">
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import {constructMap} from "../js/map";
import $ from 'jquery'
export default {
  data() {
    return {
      pickerOptions1:{
        disabledDate: (time)=>{
          const date = new Date(this.dateEnd);
          return (time.getTime() > date.getTime())
        }
      },
      pickerOptions2:{
        disabledDate(time){
          const date = new Date();
          var month = date.getMonth() + 1;
          const dateNow = new Date(date.getFullYear() + "-" + month + "-" + date.getDate() + " 00:00:00");
          return (time.getTime() > dateNow.getTime())
        }
      },
      dateBegin: "",
      dateEnd: "",
      timeBegin: null,
      timeEnd: null,
      maxTime:"",
      minTime:"",
      processBarColor: 'black',
      location: "chengdu",
      locationArray:{
        chengdu: "成都",
        zigong: "自贡",
        yibin: "宜宾"
      },
      pollutant: "o3",
      pollutantHtmlArray:{
        pm2_5:"PM<sub>2.5</sub>",
        pm10:"PM<sub>10</sub>",
        o3:"O<sub>3</sub>",
        so2:"SO<sub>2</sub>",
        no2:"NO<sub>2</sub>",
        co:"CO<sub> </sub>",
      },
      mapAttr:{
        chengdu:{
          center:[30.5, 104],
          zoomLevel: 8,
          imageBounds: [
            [30, 102.5],
            [31.5, 105],
          ]
        },
        zigong:{
          center:[29.3, 104.6],
          zoomLevel: 9,
          imageBounds: [
            [28.8, 103.9],
            [29.8, 105.4],
          ]
        },
        yibin:{
          center:[28.6, 104.5],
          zoomLevel: 9,
          imageBounds: [
            [27.6, 103.3],
            [29.5, 105.6],
          ]
        }
      },
      locationShow: false,
      pollutantShow: false,
      calenderShow: false,
      showMoveTip:false,
      playOn: false,
      currentTipX:0,
      tooltipX:0,
      playIcon: "../../static/aqstmap/icon/play.png",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    clickPollutant(pt) {
      this.pollutant = pt;
      this.addImageOverlay(this.currentImg, this.mapAttr[this.location].imageBounds);
      
    },
    clickLocation(l) {
      this.location = l;
      this.map.setView(this.mapAttr[this.location].center, this.mapAttr[this.location].zoomLevel);
      this.addImageOverlay(this.currentImg, this.mapAttr[this.location].imageBounds);
      
    },
    hidePop() {
      this.pollutantShow = false;
      this.locationShow = false;
      this.calenderShow = false;
    },
    popHidePop(buttonName) {
      if (buttonName == "location") {
        this.locationShow = !this.locationShow;
        this.pollutantShow = false;
        this.calenderShow = false;
      }
      if (buttonName == "pollutant") {
        this.pollutantShow = !this.pollutantShow;
        this.locationShow = false;
        this.calenderShow = false;
      }
      if (buttonName == "calender") {
        this.calenderShow = !this.calenderShow;
        this.locationShow = false;
        this.pollutantShow = false;
      }
    },
    sleep(time){
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    clickPlay() {
      if (!this.playOn) {
        this.playIcon = "../../static/aqstmap/icon/stop.png";
        this.playOn = true;
        //do somthing
        (async ()=>{
          while(this.playOn){
             await this.sleep(1000);
             if (this.currentTipX + this.playStep > 500){
               this.playOn = false;
               this.playIcon = "../../static/aqstmap/icon/play.png";
               this.currentTipX = 0;
             }
             if (this.playOn){ 
              this.currentTipX += this.playStep;
              this.addImageOverlay(this.currentImg, this.mapAttr[this.location].imageBounds);
             }
            }
          })();
      } else {
        this.playIcon = "../../static/aqstmap/icon/play.png";
        //do something
        this.playOn = false;
        var newVelocityLayerOptions = {
          displayValues: true,//是否显示当前鼠标移动位置，风场信息
          displayOptions: {//显示信息配置
            velocityType: "",
            displayPosition: "bottomleft",
            displayEmptyString: "No wind data",
            position: "topleft",
            // direction label prefix
            directionString: this.currentWindDate,
            // speed label prefix
            speedString: "风速",
          },
          maxVelocity: 15,
          velocityScale: 0.005,
          colorScale: ["rgb(0, 0, 0)"]
    }
    $.getJSON(this.currentWind, data => {
      this.velocityLayer.setData(data);
      });
      }
    
    this.velocityLayer.setOptions(newVelocityLayerOptions);
    },
    moveTip(event){
      this.tooltipX = event.offsetX-78;
    },
    addImageOverlay(imgurl, imgBounds){
      var imageOptions = { opacity: 0.7 };
      this.nextImgOverlay = L.imageOverlay(imgurl, imgBounds, imageOptions);

      // if (typeof(this.currentImgOverlay) != "undefined" && this.nextImgOverlay.getElement() && this.nextImgOverlay.getElement().complete){
      //     this.map.removeLayer(this.currentImgOverlay);
      // }else{
        // this.nextImgOverlay.once("load", function(){
        //   if (typeof(this.currentImgOverlay) != "undefined"){
        //     this.map.removeLayer(this.currentImgOverlay);
        //   }
        // })
        //  this.nextImgOverlay.addTo(this.map);

      // this.map.addLayer(this.nextImgOverlay);
      // }
      this.map.addLayer(this.nextImgOverlay);
      this.nextImgOverlay.once('load', ()=>{
        if (typeof(this.currentImgOverlay) != "undefined"){
              this.map.removeLayer(this.currentImgOverlay);
          }
          this.currentImgOverlay = this.nextImgOverlay;
      })
      // L.marker([31.5, 110])
      //   .addTo(window.mymap)
      //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      //   .openPopup();
    },
    clickTimeBar(){
      this.currentTipX = this.tooltipX + 78;
      this.addImageOverlay(this.currentImg, this.mapAttr[this.location].imageBounds);
      if (!this.playOn){
        //do something
        var newVelocityLayerOptions = {
          displayValues: true,//是否显示当前鼠标移动位置，风场信息
          displayOptions: {//显示信息配置
            velocityType: "",
            displayPosition: "bottomleft",
            displayEmptyString: "No wind data",
            position: "topleft",
            // direction label prefix
            directionString: this.currentWindDate,
            // speed label prefix
            speedString: "风速",
          },
          maxVelocity: 15,
          velocityScale: 0.005,
          colorScale: ["rgb(0, 0, 0)"]
        }
        $.getJSON(this.currentWind, data => {
        this.velocityLayer.setData(data);
         });
        this.velocityLayer.setOptions(newVelocityLayerOptions);
      }
    },
  },
  computed:{
    // maxTime(){
    //   if (this.dateBegin == this.dateEnd){
    //     return (this.timeEnd)
    //   }else{
    //     return ("23:00")
    //   }
    // },
    // minTime(){
    //   if (this.dateBegin == this.dateEnd){
    //     return(this.timeBegin)
    //   }else{
    //     return ("00:00")
    //   }
    // },
    colorBar(){
      return("../../static/aqstmap/icon/"+this.pollutant+".png")
    },
    dateBeginInput:{
      get(){
        return (this.dateBegin)
      },
      set(value){
        if (value == null){
          const dateEnd = new Date(this.dateEnd);
          const dateBegin = new Date();
          dateBegin.setTime(dateEnd.getTime() - 7*24*3600*1000);
          var year = dateBegin.getFullYear();
          var month = dateBegin.getMonth() + 1;
          if (month < 10){
            month = "0" + month;
          }
          var day = dateBegin.getDate();
          if (day < 10){
            day = "0" + day;
          }
          this.dateBegin = [year, month, day].join('-');
        }else{
          this.dateBegin = value;
        }
        if (this.dateBegin == this.dateEnd){
          this.maxTime = this.timeEnd;
          this.minTime = this.timeBegin;
        }else{
          this.maxTime = "";
          this.minTime = "";
        }
      }
    },
    dateEndInput: {
      get(){
        return (this.dateEnd)
      },
      set(value){
        if (value == null){
          const dateBegin = new Date(this.dateBegin);
          const dateEnd = new Date();
          dateEnd.setTime(Math.min(dateBegin.getTime() + 7*24*3600*1000, Date.now()));
          var year = dateEnd.getFullYear();
          var month = dateEnd.getMonth()+1;
          if (month < 10){
            month = "0" + month
          }
          var day = dateEnd.getDate();
          if (day < 10){
            day = "0" + day;
          }
          this.dateEnd = [year, month, day].join('-');
        }else{
          this.dateEnd = value;
        }
        if (this.dateBegin == this.dateEnd){
          this.maxTime = this.timeEnd;
          this.minTime = this.timeBegin;
        }else{
          this.maxTime = "";
          this.minTime = "";
        }
      }
    },
    timeBeginInput:{
      get(){
        if (this.timeBegin == null){
          this.timeBegin = "00:00"
        }
        return (this.timeBegin + ":00")
      },
      set(value){
        if (value == null){
          this.timeBegin = "00:00";
        }else{
          this.timeBegin = value;
        }
        if (this.dateBegin == this.dateEnd){
          this.maxTime = this.timeEnd;
          this.minTime = this.timeBegin;
        }else{
          this.maxTime = "";
          this.minTime = "";
        }
      }
      
    },
    timeEndInput:{
      get(){
        if (this.timeEnd == null){
          this.timeEnd = "23:00"
        }
        return (this.timeEnd+":00")
      },
      set(value){
        if (value == null){
          this.timeEnd = "23:00";
        }else{
          this.timeEnd = value;
        }
        if (this.dateBegin == this.dateEnd){
          this.maxTime = this.timeEnd;
          this.minTime = this.timeBegin;
        }else{
          this.maxTime = "";
          this.minTime = "";
        }
      }
    },    
    dateTimeRange(){

      return(this.dateBegin + " " + this.timeBegin + ":00" + " 至 " + this.dateEnd + " " + this.timeEnd + ":00");
    },

    playStep(){
      const datetimeBegin = new Date(this.dateBegin + " " + this.timeBegin + ":00");
      const datetimeEnd = new Date(this.dateEnd + " " + this.timeEnd + ":00");
      var seperationNum = (datetimeEnd.getTime() - datetimeBegin.getTime())/3600/1000;
      return(500/seperationNum)
    },
    currentTime(){
      const datetimeBegin = new Date(this.dateBegin + " " + this.timeBegin + ":00");
      const datetimeEnd = new Date(this.dateEnd + " " + this.timeEnd + ":00");
      const pointerT = new Date();
      var seperationNum = (datetimeEnd.getTime() - datetimeBegin.getTime())/3600/1000;
      pointerT.setTime(this.currentTipX/500 * seperationNum*3600*1000 + datetimeBegin.getTime());
      var year = pointerT.getFullYear();
      var month = pointerT.getMonth()+1;
      if (month < 10){
        month = "0" + month
      }
      var day = pointerT.getDate();
      if (day < 10){
        day = "0" + day;
      }
      var hour = pointerT.getHours();
      if (hour < 10){
        hour = "0" + hour;
      }
      var pointerTimev = [year, month, day].join("-") + " " + hour + ":00:00";
      return(pointerTimev)
    },
    pointerTime(){
      const datetimeBegin = new Date(this.dateBegin + " " + this.timeBegin + ":00");
      const datetimeEnd = new Date(this.dateEnd + " " + this.timeEnd + ":00");
      const pointerT = new Date();
      var seperationNum = (datetimeEnd.getTime() - datetimeBegin.getTime())/3600/1000;
      pointerT.setTime((this.tooltipX + 78)/500 * seperationNum*3600*1000 + datetimeBegin.getTime());
      var year = pointerT.getFullYear();
      var month = pointerT.getMonth()+1;
      if (month < 10){
        month = "0" + month
      }
      var day = pointerT.getDate();
      if (day < 10){
        day = "0" + day;
      }      
      var hour = pointerT.getHours();
      if (hour < 10){
        hour = "0" + hour;
      }
      var pointerTimev = [year, month, day].join("-") + " " + hour + ":00:00";
      return(pointerTimev)
    },
    currentImg(){
      return("../../static/aqstmap/mapdemo/" + this.location + "/" +this.pollutant + "/" + this.currentTime.slice(0, 10) + "/" + this.currentTime + ".png")
    },
    currentWind(){
      return ("../../static/aqstmap/windfield/" + this.currentTime.slice(0, 10) + "/" + this.currentTime.slice(0, 10).replaceAll("-", "") + this.currentTime.slice(11, 13) + ".json")
      // return ("../../static/aqstmap/windfield/" + "test.json")
    },
    currentWindDate(){
      return (this.currentTime.slice(0, 10) + " " + this.currentTime.slice(11, 13) + "时风向 ")
    }
  },
  created(){
    const date = new Date();
    const dateE = new Date();
    const dateB = new Date();
    dateE.setTime(date.getTime() - 3600000*24)
    dateB.setTime(date.getTime() - 8*3600000*24)
    var yearEnd = dateE.getFullYear();
    var monthEnd = dateE.getMonth()+1;
    var dayEnd = dateE.getDate();
    var yearBegin = dateB.getFullYear();
    var monthBegin = dateB.getMonth()+1;
    var dayBegin = dateB.getDate();
    if (monthBegin < 10){
      monthBegin = "0" +  monthBegin;
    }
    if (dayBegin < 10){
      dayBegin = "0" + dayBegin;
    }

    if (monthEnd < 10){
      monthEnd = "0" +  monthEnd;
    }
    if (dayEnd < 10){
      dayEnd = "0" + dayEnd;
    }
    this.dateBegin = [yearBegin, monthBegin, dayBegin].join("-");
    this.dateEnd = [yearEnd, monthEnd, dayEnd].join("-");
  },
  mounted(){
    this.constructedMap = constructMap(this.mapAttr[this.location].center,
    this.mapAttr[this.location].zoomLevel);
    this.map = this.constructedMap.map;
    this.baseLayers = this.constructedMap.baseLayers;
    this.addImageOverlay(this.currentImg, this.mapAttr[this.location].imageBounds);
    // initialize velocity layer
    var velocityLayerOptions = {
          displayValues: true,//是否显示当前鼠标移动位置，风场信息
          displayOptions: {//显示信息配置
            velocityType: "",
            displayPosition: "bottomleft",
            displayEmptyString: "No wind data",
            position: "topleft",
            // direction label prefix
            directionString: this.currentWindDate,
            // speed label prefix
            speedString: "风速",
          },
          maxVelocity: 15,
          velocityScale: 0.005,
          colorScale: ["rgb(0, 0, 0)"]
    }
    this.velocityLayer = L.velocityLayer(velocityLayerOptions);
    L.control.layers(this.baseLayers, {"风场": this.velocityLayer}).addTo(this.map)
    $.getJSON(this.currentWind, data => {
      this.velocityLayer.setData(data);
      });
  },
};
</script>
<style scoped>
@import url("../style/mapdemo.css");
</style>
