<template>
    <div class="library">
        <div class="search">
            <input v-model="searchQuery" placeholder="Search for your next podcast">
        </div>
        <div v-for="pod in podcasts" :key="pod.name" class="podcast-info-list">
                <div class="podcast-info-list__artwork">
                    <img :src="pod.artworkUrl" :alt="pod.name">    
                </div>
                <div class="podcast-info-list__text">
                    <h4>{{ pod.name }}</h4>
                    <p>{{ pod.author }}</p>
                </div>
        </div>
    </div>  
</template>

<script>
    import PodcastData from '@/common/PodcastData'
    
    export default {
        name: 'library',
        data() {
            return {
                name: 'Marcus',
                podcasts: []
            }
        },
        async mounted() {
            await this.getPodcasts()
            console.log(this.podcasts)
        }, 
        methods: {
            getPodcasts: async function () {
                let vm = this
                const pd = new PodcastData()
                try {
                    let podcastData = await pd.getPodcasts("p3")

                    podcastData.results.forEach(podcast => {
                        const data = {
                            authors: podcast.artistName,
                            name: podcast.trackName,
                            country: podcast.country,
                            artworkUrl: podcast.artworkUrl600,
                            genres: podcast.genres,
                            feedUrl: podcast.feedUrl
                        }
                        vm.podcasts.push(data)
                    })

                    

                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    
    .podcast-info-list {
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 4fr;
        background: #111;
        max-width: 100%;
        word-break: break-all;
        max-height: 128px;
        display: block;
        cursor: pointer;
        transition: background-color 0.2s ease;
        &:hover {
            background-color: #141414;
        }
        &:active {
            background-color: #555;
        }
    }

    .podcast-info-list__artwork > img {
        width: 128px;
        height: 128px;
    }

    .podcast-info-list__text {
        color: #ececec;
        font-family: sans-serif;
        text-align: left;
        padding-left: 146px;
        padding-top: 1rem;
    }
</style>