<template>
  <div>
    <a
      :href="'https://www.youtube.com/watch?v=' + video.id.videoId"
      target="_blank"
    >
      <img
        class="card-img-top"
        :src="video.snippet.thumbnails.medium.url"
        alt="YouTube thumbnail"
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">{{ video.snippet.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ video.snippet.channelTitle }} |
        {{ video.snippet.publishedAt | formatDate }}
      </h6>
      <!--<p class="card-duration">{{ video.contentDetails }}</p>-->
      <button @click="test(video)">test</button>
      <p class="card-text">{{ video.snippet.description }}</p>
      <CollectionButton v-on:addInCollection="addInCollection(video)" />
    </div>
  </div>
</template>

<script>
import CollectionButton from "./CollectionButton.vue";

export default {
  name: "VideoGridItem",
  components: {
    CollectionButton
  },
  props: ["video"],
  methods: {
    test(video) {
      console.log(video);
      //console.log(video.id.videoId);
      //console.log(video.contentDetails.duration);
    },
    addInCollection(video) {
      console.log("in VideoGridItem");
      //console.log(`video ID : ${video.id.videoId}`);
      this.$emit("addInCollection", video);
    }
  }
};
</script>
