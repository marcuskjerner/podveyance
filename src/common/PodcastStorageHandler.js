class PodcastStorageHandler {
  constructor () {
    this.storage = Window.localStorage
  }

  togglePodcast (podcast) {
    let storedPodcasts = []
    if (!this.storage.getItem('podcasts')) {
      this.storage.setItem('podcasts', JSON.parse([]))
      storedPodcasts = []
    } else {
      storedPodcasts = JSON.parse(this.storage.getItem('podcasts'))
    }
    
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

export default PodcastStorageHandler
