
<template>
  <div class='relational-books-page'>
    <butterfly-vue
      class='flow-canvas'
      :canvasConf="canvasConf"
      :canvasData="mockData"
    />
  </div>
</template>

<script>
    import {ButterflyVue} from 'butterfly-vue'
    import mockData from './mockData'

    export default {
        name: 'App',
        components: {
            ButterflyVue
        },
        data() {
            return {
                mockData: mockData,
                canvasConf: {
                    disLinkable: true, // 可删除连线
                    linkable: true, // 可连线
                    draggable: true, // 可拖动
                    zoomable: true, // 可放大
                    moveable: true, // 可平移
                    layout: {
                        type: 'dagreGroupLayout',
                        options: {
                            rankdir: 'TB',
                            nodesep: 40,
                            ranksep: 40,
                            controlPoints: false
                        }
                    },
                    theme: {
                        edge: {
                            arrow: true,
                            type: 'Straight'
                        }
                    }
                }
            }
        }
    }
</script>
