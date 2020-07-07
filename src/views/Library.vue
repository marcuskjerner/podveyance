<template>
    <div class="library">
        <div class="search-query">
            <input v-model="searchQuery" placeholder="Search for your next podcast" id="search-query__input">
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
    
    .library {
        background-color: #111;
    }

    .podcast-info-list {
        position: relative;
        margin: 0.5rem auto;
        background: #111;
        width: 480px;
        max-width: 100%;
        max-height: 96px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        padding: 0 -2rem 0 2rem;
        &:hover {
            background-color: #141414;
        }
        &:active {
            background-color: #555;
        }
    }

    .podcast-info-list__artwork > img {
        width: 96px;
        height: 96px;
    }

    .podcast-info-list__text {
        color: #ececec;
        font-family: sans-serif;
        padding-left: 128px;
        position: absolute;
        top: 1rem;
    }

    .search-query {
        width: 100%;
        height: 5rem;
    }

    #search-query__input {
        width: 100%;
        padding: 1rem 1rem;
        font-weight: bold;
        font-size: 1rem;
        border-radius: 10px;
    }

    

</style>