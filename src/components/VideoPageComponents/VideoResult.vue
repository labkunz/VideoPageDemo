<template>
  <div>
    <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
      <VideoGridItem
        v-bind:video="video"
        v-on:addInCollection="addInCollection"
      />
      <!--<CollectionButton v-on:addInCollection="addInCollection" />-->
    </div>
  </div>
</template>

<script>
import VideoGridItem from "./VideoGridItem.vue";
//import CollectionButton from "./CollectionButton.vue";

export default {
  name: "VideoResult",
  components: {
    VideoGridItem
    //CollectionButton
  },
  props: ["videos", "reformattedSearchString"],
  methods: {
    addInCollection(video) {
      console.log("in VideoResult");
      this.$emit("addInCollection", video);
    }
  }
};
</script>
