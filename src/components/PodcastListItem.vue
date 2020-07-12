<template>
    <div class="podcast-list-item">
      <div>
        <p class="podcast-list-item_title">{{episodeData.title}}</p>
        <p class="podcast-list-item_desc">{{episodeData.description.substring(0,150)}}</p>
      </div>
      <div class="podcast-list-item_buttons">
        <font-awesome-icon icon="play-circle" class="play-icon" @click="$router.go(-1)"/>
      </div>
    </div>
</template>

<script>
    export default {
        mounted: () => {
          this.logData()
        },
        props: {
            episodeData: Object
        },
        methods: {
          logData() {
            console.log(this.episodeData)
          }
        }
    }
</script>

<style lang="scss" scoped>
    .podcast-list-item {
        width: 100%;
        min-height: 100px;
        color: white;
        padding: 1rem;
        border-bottom: #222 solid 1px;
        transition: 0.2s background-color ease;
        display: grid;
        grid-template-columns: 6fr 1fr;
        justify-items: end;
        align-items: center;
        &:hover {
          background-color: rgb(24, 24, 24);
        }
    }
    

    .podcast-list-item_title {
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .podcast-list-item_desc {
      font-size: 0.8rem;
      font-weight: normal;
      color: #ccc;
      line-height: 1.1rem;
    }

    .podcast-list-item_buttons {
      padding-right: 1rem;
    }

    .play-icon {
        cursor: pointer;
        font-size: 1.2rem;
        opacity: .7;
        transition: 0.2s opacity ease;

        &:hover {
          opacity: 0.9;
        }

        &:active {
          opacity: 1;
        }
      }

</style>

