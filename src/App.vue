<template>
  <div id="app">
    <div id="app-container">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

   #app {
        display: grid;
        align-items: center;
        justify-content: center;
        background-color: #222;
        height: 100vh;
        visibility: 100vw;
        overflow: hidden;
    }

    #app-container {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      max-height: 720px;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    *::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    *::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    *::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 10px;
    }
</style>
