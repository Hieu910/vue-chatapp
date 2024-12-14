import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import Signup from "../pages/signup/Signup.vue";
import Home from "../pages/home/Home.vue";
import { useUserStore } from "../stores/user";


const router = createRouter({
    
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: "login",
            component: Login
        },
        { 
            path: '/login',
            redirect: '/'
         },
        {
            path: '/signup',
            name: "signup",
            component: Signup
        },
        {
            path: '/home',
            name:"home",
            component: Home,
        },
        { 
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
         },
    ]
})

router.beforeEach( (to, from, next) => {
    // check user data 
    const userStore = useUserStore()
    const isLogin  =  userStore.user ? true : false
    if (to.name !== 'login' && to.name !== 'signup' && to.name !== "NotFound" && !isLogin) next({ name: 'login' })
    else if (to.name === 'signup' &&  isLogin) next({ name: 'home'})
    else if (to.name === 'login' && isLogin) next({ name: 'home'})
    else next()
})


export default router