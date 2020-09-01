<template>
  <div>
    <VideoResult />
    <Pagination />
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
