<template>
  <div class="main-context">
      <div class="page-context">
        <div class="">
          <div>
            <div>
              <div class="little-title">1. 项目基本介绍</div>
              <div class="one-para-context">
                  使用XBGoost机器学习模型，结合气象数据、海拔数据和土地利用类型等预测变量，
                  融合卫星获取的污染物分布数据，对污染物的时空分布进行准确的重构，
                  用网页展示四川省三个示范城市（成都、自贡、宜宾）的六种污染物浓度分布变化特征，
                  具有高时空分辨率、全覆盖性、高准确度。
                  污染物的浓度分布预测体系能够充分显示出各地详细的污染物分布细节信息，有助于发现重要的污染源，
                  为各地节能减排政策的制定、实施起到积极参考作用。
              </div>
            </div>

            <div>
              <div class="little-title">2. 项目特色</div>
              <div>
                <ul>
                  <li>
                    使用的机器学习模型的超参数较优，模型能达到很高的预测准确性。
                  </li>
                  <li>
                    产品提升了数据填补的时空分辨率，时间分辨率高达1小时，空间分辨率达到了0.01°×0.01°（1km网格）
                  </li>
                  <li>
                    项目具有成熟的污染物实时监测网络，能自动更新小时尺度污染物的时空分布情况。
                  </li>
                </ul>
              </div>
              <div class="little-title">3. 关键技术</div>
              <div>
                <ul>
                  <li>
                    全方位、多方向地选取了可能对于污染物的时空分布有影响的地理协变量，分别用双线性插值法、面积加权法重采样至统一的空间分辨率。
                  </li>
                  <li>
                    对卫星和气象数据实现近实时下载。
                  </li>
                  <li>
                    使用机器学习模型对缺测值进行预测填补，更好地拟合训练数据，达到更好的拟合效果，达到0.01°×0.01°（1km网格）的空间分辨率，和小时级的时间分辨率。
                  </li>
                  <li>
                    通过前端、后端等技术制成网页，进行可视化展示。
                  </li>
                </ul>
              </div>
              <div class="little-title">4. 致谢</div>
              <div class="one-para-context">
                  特别在此，向对本项目提供资金资助的四川省科技厅表示感谢。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */ 
export default {}
</script>
<style scoped>
div,ul,li {
    font-size: medium;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.main-context {
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 60px;
    padding-bottom: 20px;
    width: 60%;
    height: auto;
    border: solid #e9e9e9;
    text-align: left;
}

.img-context {
    width: 100%;
    height: 150px;
}

.page-context {
    margin: 0 2%;
}

.title-context {
    margin-top: -80px;
    margin-bottom: 50px;
    color: cornsilk;
    font-size: 2em;
    font-weight: 800;
}

.little-title {
    font-size: large;
    font-weight:bolder;
    color: cadetblue;
}

.one-para-context {
    margin: 4px 0;
    text-indent: 2em;
    line-height: 22px;
}

ul {
    margin-top: 4px;
    margin-left: 5%;
    margin-bottom: 4px;
}

li {
    list-style-type: circle;
    line-height: 22px;
}

.question {
    font-weight: 600;
}
</style>
