<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <h1>Video Page</h1>
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    <VideoPage />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import VideoPage from "../components/VideoPage.vue";

export default {
  name: "Home",
  components: {
    VideoPage
  }
};
</script>
