<template>
  <div>
    <VideoResult
      v-if="videos.length > 0"
      v-bind:videos="videosPage"
      v-on:addInCollection="addInCollection"
    />
    <a-pagination
      v-if="videos.length > 0"
      v-model="currentPage"
      :defaultPageSize="12"
      :total="100"
      @change="changePage"
    />
  </div>
</template>

<script>
import VideoResult from "./VideoPageComponents/VideoResult.vue";

export default {
  name: "VideoPageCollection",
  components: {
    VideoResult
  },
  data() {
    return {
      videos: [],
      videosPage: [],
      currentPage: 1
    };
  },
  methods: {
    getCollectionData() {
      this.videos = JSON.parse(localStorage.getItem("CollectionVideo")) || [];
    },
    changePage(pageNum) {
      pageNum !== undefined ? pageNum : 1;
      const maxResultVideos = 12;
      var begin = pageNum - 1;
      var end = pageNum;
      this.videosPage = this.videos.slice(
        begin * maxResultVideos,
        end * maxResultVideos
      );
    },
    addInCollection(video) {
      var CollectionVideos =
        JSON.parse(localStorage.getItem("CollectionVideo")) || [];
      var videoItem = CollectionVideos.find(
        Item => Item.id.videoId === video.id.videoId
      );

      if (videoItem) {
        var videoIndex = CollectionVideos.indexOf(videoItem);
        CollectionVideos.splice(videoIndex, 1);
      } else {
        CollectionVideos.push(video);
      }
      localStorage.setItem("CollectionVideo", JSON.stringify(CollectionVideos));
    }
  }
};
</script>
