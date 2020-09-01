<template>
  <div class="test1">
    <SearchForm v-on:search="search" />
    <VideoResult
      v-if="videos.length > 0"
      v-bind:videos="videos"
      v-bind:reformattedSearchString="reformattedSearchString"
      v-on:addInCollection="addInCollection"
    />
    <!--<a-pagination v-if="videos.length > 0" />-->
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
import SearchForm from "./VideoPageComponents/SearchForm.vue";
import VideoResult from "./VideoPageComponents/VideoResult.vue";
import Pagination from "./VideoPageComponents/Pagination.vue";
import axios from "axios";

export default {
  name: "VideoPage",
  components: {
    SearchForm,
    VideoResult,
    Pagination
  },
  data() {
    return {
      videos: [],
      videoDetails: [],
      reformattedSearchString: "",
      api: {
        baseUrl: "https://www.googleapis.com/youtube/v3/search?",
        part: "snippet",
        type: "video",
        order: "viewCount",
        maxResults: 12,
        q: "",
        key: "AIzaSyBhNdWYtRRuYJVGVDcFhI9FuP4dUtANFH8",
        prevPageToken: "",
        nextPageToken: ""
      },
      videoApi: {
        baseUrl: "https://www.googleapis.com/youtube/v3/video?",
        part: ["snippet,contentDetails"],
        ids: [],
        key: "AIzaSyBhNdWYtRRuYJVGVDcFhI9FuP4dUtANFH8"
      }
    };
  },
  methods: {
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(" ");
      this.api.q = searchParams.join("+");
      const { baseUrl, part, type, order, maxResults, q, key } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
      this.getData(apiUrl);
    },
    prevPage() {
      const {
        baseUrl,
        part,
        type,
        order,
        maxResults,
        q,
        key,
        prevPageToken
      } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
      this.getData(apiUrl);
    },
    nextPage() {
      const {
        baseUrl,
        part,
        type,
        order,
        maxResults,
        q,
        key,
        nextPageToken
      } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      this.getData(apiUrl);
    },
    getData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          this.videos = res.data.items;
          //this.videoApi.ids.push(this.collectVideoId(this.videos));
          //this.setVideoUrl();
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
        })
        .catch(error => console.log(error));
    },
    collectVideoId(videos) {
      //console.log(videos);
      let videoIds = "";
      for (var video of videos) {
        //console.log(video);
        //videoIds.push(video.id.videoId);
        if (videoIds === "") {
          videoIds = video.id.videoId;
        } else {
          videoIds += `,${video.id.videoId}`;
        }
      }
      console.log(videoIds);
      return videoIds;
      //console.log(this.videoDetails);
    },
    setVideoUrl() {
      const { baseUrl, part, ids, key } = this.videoApi;
      const videoApiUrl = `${baseUrl}part=${part}&id=${ids}&key=${key}`;
      console.log(videoApiUrl);
      this.getDetailData(videoApiUrl);
    },
    getDetailData(videoApiUrl) {
      axios
        .get(videoApiUrl)
        .then(res => {
          this.videoDetails = res.data.items;
          console.log(this.videoDetails);
        })
        .catch(error => console.log(error));
    },
    addInCollection(video) {
      console.log("in VideoPage");
      console.log(`video ID : ${video.id.videoId}`);
      localStorage.setItem("CollectionVideo", JSON.stringify(video));
    }
  }
};
</script>
