class PodcastStorageHandler {
import { Podcast } from '@/views/Podcast';
  constructor () {
    this.storage = document.localStorage
  }

  togglePodcast (podcast) {
    if (this.storage.hasOwnProperty('podcasts')) {
      const storedPodcasts = JSON.parse(this.storage.getItem('podcasts'))
      if (storedPodcasts.includes(podcast)) {
        const index = storedPodcasts.indexOf(podcast)
        storedPodcasts.slice(index, index)

        this.storage.setItem('podcasts', JSON.stringify(storedPodcasts))
      } else {
        storedPodcasts.push(podcast)
        this.storage.setItem('podcasts', JSON.stringify(storedPodcasts))
      }
    }
  }
}


