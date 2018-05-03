<template>
    <div class="swiper-container" style="height:100%;">
        <swiper>
            <!-- slides @someSwiperEvent="callback" -->
            <swiper-slide>I'm Slide 1</swiper-slide>
            <swiper-slide>I'm Slide 2</swiper-slide>
            <swiper-slide>I'm Slide 3</swiper-slide>
            <swiper-slide>I'm Slide 4</swiper-slide>
            <swiper-slide>I'm Slide 5</swiper-slide>
            <swiper-slide>I'm Slide 6</swiper-slide>
            <swiper-slide>I'm Slide 7</swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';
export default {
    components:{swiper,swiperSlide},
    data(){
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
        }
    },
    mounted(){

    },
    methods:{
        init(){
            const mySwiper = new Swiper ('.swiper-container', {
                direction: 'vertical',
                loop: true,
                
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination',
                },
                
                // 如果需要前进后退按钮
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
                
                // 如果需要滚动条
                scrollbar: {
                el: '.swiper-scrollbar',
                },
            })     
        }
    }
}
</script>

<style scoped>
    /* @import url('swiper/dist/css/swiper.css'); */
</style>

