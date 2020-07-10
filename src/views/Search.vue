<template>
    <div class="search">
        <div class="search-query">
            <font-awesome-icon icon="chevron-left" class="menu-icon"/>
            <input v-model="searchQuery" placeholder="Search for your next podcast" id="search-query__input" v-on:keyup="search">
        </div>
        <div v-for="pod in podcasts" :key="generatePodUid(pod)" :podcastData="pod" class="podcast-info-list">
                <div @click="pushRoute('podcast', pod)">
                    <div class="podcast-info-list__artwork">
                        <img :src="pod.artworkUrl" :alt="pod.name">    
                    </div>
                    <div class="podcast-info-list__text">
                        <h4>{{ pod.name }}</h4>
                        <p>{{ pod.author }}</p>
                    </div>
                </div>
        </div>
    </div>  
</template>

<script>
    import PodcastData from '@/common/PodcastData'
    
    export default {
        name: 'search',
        data() {
            return {
                name: 'Search',
                searchQuery: '',
                podcasts: []
            }
        },
        async mounted() {
            await this.getPodcasts()
            console.log(this.podcasts)
        }, 
        methods: {
            getPodcasts: async function () {
                this.podcasts = []
                let vm = this
                const pd = new PodcastData()

                if(this.searchQuery.length > 1) {
                    try {
                        let podcastData = await pd.getPodcasts(this.searchQuery)
                        if(podcastData.results) {
                            podcastData.results.forEach(podcast => {
                                if(!vm.isDuplicate(podcast)) {
                                    const data = {
                                        authors: podcast.artistName,
                                        name: podcast.trackName,
                                        country: podcast.country,
                                        artworkUrl: podcast.artworkUrl600,
                                        genres: podcast.genres,
                                        feedUrl: podcast.feedUrl,
                                        id: podcast.collectionId
                                    }

                                    vm.podcasts.push(data)
                                }
                                
                            })
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    this.podcasts = []
                }
                
            },
            search() {
                this.getPodcasts(this.searchQuery)
            },
            generatePodUid(podcast) {
                let uid = podcast.name.trim() + this.$uuid.v4()
                return uid
            },
            isDuplicate(podcast) {
                this.podcasts.forEach(pod => {
                    if(pod.name == podcast.name && pod.name == podcast.name) {
                        return true
                    }
                    return false
                })
            },
            pushRoute(view, podcast) {
                this.$router.push({
                    name: view,
                    params: {
                        podcastData: podcast
                    }
                }) 
            }
        }
    }
</script>

<style lang="scss" scoped>
    
    .search {
        background-color: #111;
    }

    .podcast-info-list {
        position: relative;
        margin: 1rem auto;
        background: #111;
        width: 480px;
        max-width: 90%;
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
        display: grid;
        grid-template-columns: 1fr 19fr;
        justify-items: center;
        align-items: center;
        width: 100%;
        height: 5rem;

        .menu-icon {
            cursor: pointer;
            width: 52px;
        }
    }

    #search-query__input {
        width: 100%;
        font-weight: bold;
        font-size: 1rem;
        background: transparent;
        color: #fafafa;
    }

        

</style>textarea:focus, input:focus{
    outline: none;
}