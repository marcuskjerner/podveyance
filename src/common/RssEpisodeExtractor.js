let Parser = require('rss-parser');
let parser = new Parser();

class RssEpisodeExtractor {

    constructor(rssUrl) {
        this.url = rssUrl;
        this.episodes = []
    }

    async getEpisodes() {
        try {
            let feed = await parser.parseURL(this.url);
            
            feed.items.forEach(item => {
                this.episodes.push(this.extractEpisode(item))
            })            

            return this.episodes;
        } catch(err) {
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