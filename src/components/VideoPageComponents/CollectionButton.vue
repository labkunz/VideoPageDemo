<template>
  <div>
    <button @click="addInCollection">收藏</button>
  </div>
</template>

<script>
export default {
  name: "CollectionButton",
  methods: {
    addInCollection() {
      this.$emit("addInCollection");
    }
  }
};
</script>
