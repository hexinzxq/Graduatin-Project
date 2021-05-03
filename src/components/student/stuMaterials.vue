<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      avartarSrc: "",
      myName: "",
    };
  },
  mounted() {
    this.avartarSrc = localStorage.getItem("avartar_src");
    // console.log(this.avartarSrc);
    this.myName = localStorage.getItem("stu_name");
  },
  created() {
    this.avartarSrc = localStorage.getItem("avartar_src");
    this.myName = localStorage.getItem("stu_name");
    // console.log(this.myName);
  },
};
</script>

<style scoped>

</style>    
