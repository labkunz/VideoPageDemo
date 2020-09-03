<template>
  <div class="test1">
    <SearchForm v-on:search="search" />
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
import SearchForm from "./VideoPageComponents/SearchForm.vue";
import VideoResult from "./VideoPageComponents/VideoResult.vue";
import axios from "axios";

export default {
  name: "VideoPage",
  components: {
    SearchForm,
    VideoResult
  },
  data() {
    return {
      videos: [],
      videosPage: [],
      videoApi: {
        baseUrl: "https://www.googleapis.com/youtube/v3/videos?",
        part: "snippet,contentDetails",
        chart: "mostPopular",
        maxResults: 50,
        key: "YOUTUBE_API",
        nextPageToken: ""
      },
      currentPage: 1
    };
  },
  async mounted() {
    this.getVideo();
  },
  methods: {
    async getVideo() {
      try {
        await this.getVideohalf();
        await this.nextVideoPage();
      } catch (err) {
        console.log(err);
      }
    },
    getVideohalf() {
      const { baseUrl, part, chart, maxResults, key } = this.videoApi;
      const apiUrl = `${baseUrl}part=${part}&chart=${chart}&maxResults=${maxResults}&key=${key}`;
      this.getVideoData(apiUrl);
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
    nextVideoPage() {
      const {
        baseUrl,
        part,
        chart,
        maxResults,
        key,
        nextPageToken
      } = this.videoApi;
      const apiUrl = `${baseUrl}part=${part}&chart=${chart}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      this.getVideoData(apiUrl);
    },
    getVideoData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          this.videos.length === 0
            ? (this.videos = res.data.items)
            : (this.videos = this.videos.concat(res.data.items));
          this.api.nextPageToken = res.data.nextPageToken;
        })
        .catch(error => console.log(error));
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
