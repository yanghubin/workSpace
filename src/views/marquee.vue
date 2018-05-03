<template>
    <div class="marquee">
        <h1>我是marquee对象</h1>
        <marquee id="slider" behavior="scroll" scrollamount="20" height='30' width='100%' style="color:#000">{{scrollText}}{{num}}</marquee>
        <Button type="primary" @click="nextHandler">点击</Button>
        <router-link to="/map"><Button type="primary">去地图页</Button></router-link>
        <router-link to="/getPos"><Button type="primary">获取本地位置</Button></router-link>
    </div>
</template>

<script>
import {gen} from "../../until/until"
import Vue from 'Vue'
export default {
    data(){
        return {
            scrollText:'测试我是marquee对象',
            num:4
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            
            this.promiseTest().then((val)=>{
                this.scrollText=val;
            },(err)=>{
                this.scrollText=err;
            })
        },
        nextHandler(){
            console.log(123123);
        },
        promiseTest(){
            let mark=false;
            var timer=null;
            var num=4;
            timer=setInterval(()=>{
                num--;
                this.num=num;
                if(num<=0){
                    clearInterval(timer);
                }
            },1000)
            return new Promise(function(resolve, reject) {
                setTimeout(()=>{
                    mark=true;
                    if (mark){
                    resolve('异步加载成功');
                    } else {
                        reject('异步加载失败');
                    }
                },4000)
                
            });
        },
        classFun(){
            
        }
        
    }
}
</script>

<style>

</style>
