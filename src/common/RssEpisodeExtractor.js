let Parser = require('rss-parser')
let parser = new Parser()

class RssEpisodeExtractor {
  constructor () {
    this.feedUrl = ''
    this.episodes = []
  }

  async getEpisodes (feedUrl) {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/' // TODO: Remove

    this.feedUrl = feedUrl
    try {
      let feed = await parser.parseURL(CORS_PROXY + this.feedUrl)
      this.episodes = []
      
      feed.items.forEach(item => {
        this.episodes.push(this.extractEpisode(item))
      })

      return this.episodes
    } catch (err) {
      console.error(err)
    }
  }

  extractEpisode (item) {
    const episode = {
      title: item.title,
      publishData: item.pubDate,
      description: item.contentSnippet,
      duration: item.itunes.duration,
      thumbnail: item.itunes.image,
      audio: {
        url: item.enclosure.url,
        length: item.enclosure.length,
        type: item.enclosure.type
      }
    }

    return episode
  }
}

export default RssEpisodeExtractor
