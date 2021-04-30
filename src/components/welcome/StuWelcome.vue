<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="80vh"
      :autoplay="true"
      loop
    >
      <el-carousel-item v-for="(img, index) in imgList">
        <img v-bind:src="img.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      imgList: [
        { url: "https://z3.ax1x.com/2021/03/27/cSm3EF.png" },
        { url: "https://z3.ax1x.com/2021/03/27/cSim5t.png" },
        { url: "https://z3.ax1x.com/2021/03/27/cSVc3q.png" },
        { url: "https://z3.ax1x.com/2021/03/27/cSnyZT.png" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  width: 100%;
  height: 100%;
}
</style>
