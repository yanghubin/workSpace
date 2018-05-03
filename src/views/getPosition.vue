<template>
    <div class="pos-box">

    </div>
</template>

<script>
export default {
    data(){
        return{
            image:''
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            // this.getPos();
            
        },
        getPos(){
            if(!navigator.geolocation)throw 'Geolocation not supported';
            this.image=document.createElement('img');
            navigator.geolocation.getCurrentPosition(this.setMapUrl,this.error);
            return this.image;
        },
        setMapUrl(pos){
            let lat=pos.coords.latitude;
            let long=pos.coords.longitude;
            let accuracy=pos.coords.accuracy;

            // let url=`http://www.google.cn/maps/@-${lat},${long},${accuracy}z`;
            let url=`http://maps.google.com/maps/api/staticmap?center=${lat},${long}&size=640x640&sensor=true`;
            let zoom=20;
            this.image.src=url;
        },
        error(msg){
            console.log(msg,123);
        }
    }
}
</script>

<style>

</style>
