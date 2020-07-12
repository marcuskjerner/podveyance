<template>
  <div class="podcast-info">
    <div class="podcast-info_header">
      <div class="podcast-info_thumbnail"></div>

      <div class="podcast-info_buttons">
        <div></div>
        <!-- Button Placeholder -->
        <div></div>
        <!-- Button Placeholder -->
        <div
          class="btn podcast-info_subscribe_button"
          @click="toggleSubscription()"
        >
          <font-awesome-icon
            icon="check-circle"
            class="podcast-info_subscribe_icon"
          />
        </div>
      </div>
    </div>

    <div
      v-for="episode in episodes"
      :key="episode.name"
      :episodeData="episode"
      class="episodes"
    >
      <podcastListItem :episodeData="episode" @onDownload="downloadAudio(episode)"></podcastListItem>
    </div>

    <font-awesome-icon
      icon="chevron-left"
      class="back-button"
      @click="$router.go(-1)"
      style="cursor: pointer;"
    />
  </div>
</template>

<script>
import RssEpisodeExtractor from '@/common/RssEpisodeExtractor'
import PodcastListItem from '@/components/PodcastListItem'

const extractor = new RssEpisodeExtractor()

export default {
  name: 'podcast',
  beforeMount () {
    this.init()
    this.getPodcastInfo()
    this.isStored()
  },
  mounted () {
    if (localStorage.getItem('podcasts')) {
      try {
        this.myPodcasts = JSON.parse(localStorage.getItem('podcasts'))
      } catch (e) {
        localStorage.removeItem('podcasts')
      }
    }
  },
  props: {
    name: String,
    podcastData: Object
  },
  data: () => {
    return {
      episodes: [],
      isSubscribed: null,
      myPodcasts: [],
      nowPlaying: {
        src: String,
        cover: String,
        isPlaying: Boolean
      }
    }
  },
  methods: {
    init () {
      this.episodes = []
    },
    async getPodcastInfo () {
      this.episodes = []
      try {
        this.episodes = await extractor.getEpisodes(
          this.$route.params.podcastData.feedUrl
        )
        this.isStored() ? this.changeSubIconState('subscribed') : this.changeSubIconState('unsubscribed')

        const thumbnail = document.querySelector('.podcast-info_thumbnail')
        thumbnail.style.backgroundImage = `url(${this.$route.params.podcastData.artworkUrl}`
      } catch(e) {
        this.$router.go(-1)
      }
      
    },
    changeSubIconState (val) {
      const subsIcon = document.querySelector('.podcast-info_subscribe_icon')
      
      subsIcon.style.color = val === 'subscribed' ? '#50C878' : '#aaa'
    },
    toggleSubscription () {
      if (!this.isStored()) {
        this.changeSubIconState('subscribed')
        this.myPodcasts.push(this.podcastData)
        this.storeMyPodcasts()
      } else {
        this.unsubscribePodcast()
        this.storeMyPodcasts()
      }
    },
    isStored () {
      if (
        this.myPodcasts.filter(e => e.id === this.podcastData.id).length > 0
      ) {
        this.isSubscribed = true
        return true
      } else {
        this.isSubscribed = false
        return false
      }
      
    },
    storeMyPodcasts () {
      const parsedPodcasts = JSON.stringify(this.myPodcasts)
      localStorage.setItem('podcasts', parsedPodcasts)
    },
    unsubscribePodcast () {
      this.changeSubIconState('unsubscribed')
      this.myPodcasts = this.myPodcasts.filter((pod) => pod.id !== this.podcastData.id)
    }
  },
  components: {
    podcastListItem: PodcastListItem,
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
