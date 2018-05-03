<template>
    <div id="map"></div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        dojo.addOnLoad(this.init);
    },
    methods:{
        init(){
            // require(["esri/map","dojo/domReady!"], function(Map) {
                var map = new esri.Map("map", {
                    center: [-118, 34.5],
                    zoom: 8,
                    basemap: "hybrid"
                });
            // });
        }
        
    }
}
</script>
<style>
    html, body, #map {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
</style>
