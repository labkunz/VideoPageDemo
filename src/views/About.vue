<template>
  <div class="about">
    <h1>Video Collection Page</h1>
    <VideoPageCollection />
  </div>
</template>

<script>
import VideoPageCollection from "../components/VideoPageCollection.vue";

export default {
  name: "About",
  components: {
    VideoPageCollection
  }
};
</script>
