<script setup>
import { RouterView } from 'vue-router';
import io from 'socket.io-client'
import { useUserStore } from './stores/user';
import { reactive,watchEffect,computed ,provide } from 'vue';




  const { user } = useUserStore()
    const socket = reactive({data: null }) 
    const onlineUsers = reactive({data: [] }) 
  
    watchEffect((onCleanup)=>{
        if(user.data){
            const socketio = io("http://localhost:5000",{
              query: {
                userId: user.data._id,
              },
            })
            socket.data = socketio
            socket.data.on("getOnlineUsers",(users) => {
           
            onlineUsers.data = users
            
          })
        
        }
        else {
            if(socket.data){
                socket.data.close()
                socket.data = null
            }
        }
        onCleanup(()=>{
            socket.data?.close()
        })
    })
   
   provide('socket', {
        socket,
         onlineUsers
    })
   

</script>

<template>
  
<main class="p-4 h-screen flex items-center justify-center">
  <RouterView />
</main>

</template>

<style scoped>

</style>
