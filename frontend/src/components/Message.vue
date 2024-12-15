        
<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";
import {useConversationStore } from "../stores/conversation"
import { getHourMinute } from "./../utils/timeFormat.js"


    const props = defineProps(['messageData'])
    const { user, setUser } = useUserStore();
    const { selectedConversation } = useConversationStore();
    const isSender = props.messageData.senderId === user.data?._id
    const profilePic = isSender ? user.data?.profilePic : selectedConversation.data?.profilePic;
    
</script>
<template>
    <div :class="[isSender ? 'chat-end' : 'chat-start','chat']">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
            <img
                alt="Tailwind CSS chat bubble component"
                :src="profilePic" />
            </div>
        </div>
        <div class="chat-header">
            {{}}
            <time class="text-xs opacity-50">{{getHourMinute(props.messageData.createdAt)}}</time>
        </div>
        <div :class="[isSender ? 'chat-bubble-info text-white' : '','chat-bubble']" >{{props.messageData.message}}</div>
        <div class="chat-footer opacity-50">Delivered</div>
    </div>
</template>

<style scoped>

</style>