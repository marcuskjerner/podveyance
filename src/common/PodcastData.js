const fetch = require('node-fetch')

const RssEpisodeExtractor = require('@/common/RssEpisodeExtractor')


class PodcastData {
    
    async getEpisodes (query) {
        const data = await this.getPodcasts(query)
        const rss = await data.results[0].feedUrl
    
        const episodeExtractor = new RssEpisodeExtractor(rss)
        
        const episodes = await episodeExtractor.getEpisodes()
        
        return episodes;
    }
    
    async getPodcasts(query) {
        const queryStr = encodeURIComponent(query)
    
        try {
            const res = await fetch(`https://itunes.apple.com/search?term=${queryStr}&media=podcast&enities=podcast&attribute=titleTerm`)
            const data = await res.json()
    
            return data
        } catch(err) {
            console.log(err)
        }
    }
    
    async printEpisodes() {
        console.log(await this.getEpisodes())
    }
}

export default PodcastData