<template>
    <div class="podcast-info">
      <div class="podcast-info_header">
        <div class="podcast-info_thumbnail"></div>
        
        <div class="podcast-info_buttons">
          <div></div> <!-- Button Placeholder -->
          <div></div> <!-- Button Placeholder -->
          <div class="btn podcast-info_subscribe_button" @click="toggleSubscription()">
            <font-awesome-icon icon="check-circle" class="podcast-info_subscribe_icon"/>
          </div>
        </div>
      </div>

      <div v-for="episode in episodes" :key="episode.name" :episodeData="episode" class="episodes">
        <podcastListItem :episodeData="episode"></podcastListItem>
      </div>

      <font-awesome-icon icon="chevron-left" class="back-button" @click="$router.go(-1)" style="cursor: pointer;"/>
    </div>
</template>

<script>
  import RssEpisodeExtractor from '@/common/RssEpisodeExtractor'
  import PodcastListItem from '@/components/PodcastListItem'
  const extractor = new RssEpisodeExtractor()
  export default {
      name: 'podcast',
      beforeMount() {
        this.init()
        this.getPodcastInfo()
        this.isSubscribed()
      },
      props: {
        name: String,
        podcastData: Object,
      },
      data: () => {
        return {
          episodes: [],
          isSubscribed: false
        }
      },
      methods: {
        init() {
          this.episodes = []
          this.isSubscribed = false
        },
        async getPodcastInfo() {
          this.episodes = await extractor.getEpisodes(this.$route.params.podcastData.feedUrl)

          const thumbnail = document.querySelector('.podcast-info_thumbnail')
          thumbnail.style.backgroundImage = `url(${this.$route.params.podcastData.artworkUrl}`

          console.log(this.episodes)
        },
        checkSubscription () {
          const subsIcon = document.querySelector('.podcast-info_subscribe_icon')
          
          if(!this.isSubscribed) {
            subsIcon.style.color = '#aaa'
          } else {
            subsIcon.style.color = '#50C878'
          }
        },
        toggleSubscription() {
          this.isSubscribed = !this.isSubscribed
          this.checkSubscription()
        }
      },
      components: {
        podcastListItem: PodcastListItem
      }
  }
</script>

<style lang="scss" scoped>
  .podcast-info {
    width: 100%;
    min-width: 480px;
    position: relative;
  }
  .podcast-info_header {
      background-color: #0a0a0a;
      width: 100%;
      min-height: 240px;
      padding: 2rem;
  }

  .podcast-info_thumbnail {
    background-size: cover;
    border-radius: 8px;
    margin: auto;
    height: 240px;
    width: 240px;
  }

  .podcast-info_buttons {
    width: 100%;
    color: #eee;
    display: grid;
    height: 3rem;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: end;
    align-content: end;
    .btn {
      cursor: pointer;
      color: white;
      opacity: 0.8;
      font-size: 1.3em;

      &:hover {
        opacity: 0.4;
      }

      &:active {
        opacity: 1;
      }
    }
  }

  .back-button {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: white;
    font-size: 1.2rem;
  }
</style>