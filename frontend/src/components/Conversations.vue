<script setup>
    import useGetConversations from '../hooks/useGetConversations';
    import { useConversationStore } from '../stores/conversation';


    const { selectedConversation, setSelectedConversation } = useConversationStore()
    const { loading, conversations } = useGetConversations();

 
</script>
<template>
    <div class="overflow-auto flex flex-1">
        <template v-if="loading">
            <span class="loading loading-spinner text-neutral m-auto"></span>
        </template>
        <template  v-else>
            <ul class="menu bg-base-200 rounded-box w-full flex-1 min-h-min bg-transparent">
                <li @click="setSelectedConversation(item)"  v-for="(item, i ) in conversations.data">
                    <div :class="{ active: selectedConversation.data?._id === item._id }">
                        <div class="avatar online placeholder">
                            <div class="w-12 rounded-full">
                            <img :src="item.profilePic" alt="item.fullName"/>
                            </div>
                            
                        </div>
                        <div>
                            <span class="font-bold text-lg">{{ item.fullName }}</span>
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