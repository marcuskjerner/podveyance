<template>
    <div class="view">
      <!-- <h2>Podcast: {{ this.params.podcastData }}</h2> -->
    </div>
</template>

<script>
  import RssEpisodeExtractor from '@/common/RssEpisodeExtractor'
  const extractor = new RssEpisodeExtractor()
  export default {
      name: 'podcast',
      mounted() {
        this.getPodcastInfo()
      },
      props: {
        name: String,
        podcastData: Object,
      },
      data: () => {
        return {
          feedUrl: ''
        }
      },
      methods: {
        async getPodcastInfo() {
          const rssData = await extractor.getEpisodes(this.$route.params.podcastData.feedUrl)

          console.log(rssData)
        }
      }
  }
</script>

<style lang="scss" scoped>
  .view {
    width: 100%;
  }
</style>