<template>
  <div>
    <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
      <VideoGridItem
        v-bind:video="video"
        v-on:addInCollection="addInCollection"
      />
    </div>
  </div>
</template>

<script>
import VideoGridItem from "./VideoGridItem.vue";

export default {
  name: "VideoResult",
  components: {
    VideoGridItem
  },
  props: ["videos", "reformattedSearchString"],
  methods: {
    addInCollection(video) {
      this.$emit("addInCollection", video);
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-around;
}
</style>
