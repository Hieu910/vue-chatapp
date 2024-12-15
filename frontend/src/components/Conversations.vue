<script setup>

    import { computed, inject, reactive, watchEffect } from 'vue';
    import useGetConversations from '../hooks/useGetConversations';
    import useListenMessages from '../hooks/useListenMessages';
    import { useConversationStore } from '../stores/conversation';


    const {  onlineUsers } = inject('socket')
    const { selectedConversation, setSelectedConversation, filters } = useConversationStore()
    const { loading, conversations } = useGetConversations();
    const { hasNewMessage, setHasNewMessage } = useListenMessages()
    const isOnline = (id)=>{
        return onlineUsers?.data.some((item)=>{
            return item == id
        })
    }
    const isNewMessage = (id)=>{
        console.log(id)
        console.log(hasNewMessage.value)
        return hasNewMessage.value == id
    }
   
    const filteredConversations = computed(()=>{
        return conversations.data.filter((item)=>{
           return  item.fullName.includes(filters.data)
        })
    })

    const handleClick = (item)=> {
        setSelectedConversation(item)
        
        if(isNewMessage(item._id)) {
            setHasNewMessage('')
        }
    }

</script>
<template>
    <div class="overflow-auto flex flex-1">
        <template v-if="loading">
            <span class="loading loading-spinner text-neutral m-auto"></span>
        </template>
        <template  v-else>
            <ul class="menu bg-base-200 rounded-box w-full flex-1 min-h-min bg-transparent">
                <template v-if="!filteredConversations.length">
                     <span class="text-center font-bold">No user found</span>
                </template>
                <li @click="handleClick(item)"  v-for="(item, i ) in filteredConversations" :key="item._id">
                    <div :class="{ active: selectedConversation.data?._id === item._id }">
                        <div class="avatar  placeholder" :class=" isOnline(item._id) ? 'online': '' ">
                            <div class="w-12 rounded-full">
                            <img :src="item.profilePic" alt="item.fullName"/>
                            </div>
                          
                        </div>
                        <div>
                            <span class="font-bold text-lg">{{ item.fullName }}</span>
                        </div>
                        <div v-if="isNewMessage(item._id)">
                             <i  class="iconify text-info text-3xl" :data-icon="'fluent:comment-badge-20-filled'" ></i> 
                        </div>
                    </div>
                    <div v-if="i !== conversations.data.length - 1" className="divider my-0 py-0 h-1"></div>
                </li>
                
            </ul>
        </template>
    </div>
</template>



<style  scoped>

</style>