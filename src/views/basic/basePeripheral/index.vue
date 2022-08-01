<template>
  <div class="peripheral">
    <iframe id="basic-peripheral" :src="urlredirect" scrolling="no" frameborder="0" />
  </div>
</template>

<script>
export default {
    props: ['urlredirect'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
.peripheral {
    width: 100%;
    height: calc(100vh - 87px);
    overflow-y: scroll;
    overflow-x: hidden;

    iframe {
        width: 100%;
        height: 100%;

        body,
        html,
        #app {
            overflow-y: scroll !important;
            ;
        }
    }
}
</style>
