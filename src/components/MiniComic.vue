<template>
  <div>
    <v-img :src="comicImage" :alt="comicTitle" :title="comicTitle"></v-img>

    <div class="mt-2">{{ comicTitle }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comicImage: String,
    comicTitle: String,
  },
};
</script>

<style></style>
