<template>
    <div class="home">
        <div class="home_header">
            <h1 class="app-logo">PODVEYANCE</h1>
            <router-link to="/search" class="home_search">
                <font-awesome-icon
                    icon="search"
                    style="cursor: pointer;"
                />
            </router-link>
        </div>
        <div class="home_grid-view"> <!-- TODO: Move to seperate component -->
            <img v-for="pod in this.myPodcasts" :key="pod.id" :podcastData="pod" img :src="pod.artworkUrl" class="home_grid-artwork" />
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'home',
        data: () => {
            return {
                myPodcasts: []
            }
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
    }
</script>

<style lang="scss" scoped>

    .home_header {
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1em;
    }

    .app-logo {
        text-align: left;
        color: #eee;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .home_search {
        text-align: right;
        color: white;
    }

    .home {
        width: 100%;
        min-width: 480px;
        position: relative;
    }

    .home_grid-view {
        margin-top: 1rem;
        padding: 1em;
        display: grid;
        grid-gap: 6px;
        width: 100%;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .home_grid-artwork {
        cursor: pointer;
        transition: 0.2s filter ease;
        filter: contrast(0.8);
        max-width: 100%;
        border-radius: 6px;

        &:hover {
            filter: contrast(1);
        }
    }
</style>