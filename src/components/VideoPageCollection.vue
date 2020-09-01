<template>
  <div>
    <VideoResult v-if="videos.length > 0" v-bind:videos="videos" />
    <Pagination
      v-if="videos.length > 0"
      v-bind:prevPageToken="api.prevPageToken"
      v-bind:nextPageToken="api.nextPageToken"
      v-on:prev-page="prevPage"
      v-on:next-page="nextPage" 
    />
  </div>
</template>

<script>
import VideoResult from "./VideoPageComponents/VideoResult.vue";
import Pagination from "./VideoPageComponents/Pagination.vue";

export default {
  name: "VideoPageCollection",
  components: {
    VideoResult,
    Pagination
  },
  data() {
    return {
      videos: []
    };
  },
  methods: {
    getCollectionData() {
      this.videos = JSON.parse(localStorage.getItem("CollectionVideo")) || [];
    }
  }
};
</script>
