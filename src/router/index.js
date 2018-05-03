import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import marquee from "@/views/marquee"
import map from "@/views/map"
import slide from "@/views/ice-slider"
import getPos from "@/views/getPosition"

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path:"/",
            name:'marquee',
            component:marquee
        },{
            path: '/',
            name: 'Hello',
            component: Hello
        },{
            path:'/map',
            name:'map',
            component:map
        },{
            path:'/slide',
            name:'slide',
            component:slide
        },{
            path:'/getPos',
            name:'getPos',
            component:getPos
        }
    ]
})
