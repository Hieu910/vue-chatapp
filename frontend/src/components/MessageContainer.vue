<script setup>
import Messages from './Messages.vue';
import MessageInput from './MessageInput.vue';
import DefaultChat from './DefaultChat.vue';
import { useConversationStore } from '../stores/conversation';
import { ref,watchEffect  } from 'vue';


const {selectedConversation , setSelectedConversation} = useConversationStore()

watchEffect(async (onCleanup) => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/1`
//   )
//   data.value = await response.json()
  onCleanup(() => {
    // cleanup logic
    setSelectedConversation(null)
    console.log("clean")
  })
})

</script>
<template>
    <div class="flex flex-col md:min-w-[450px]">
            <template v-if="!selectedConversation.data">
                <DefaultChat/>
            </template>
            <template v-else>
            <div class="px-4 py-2 mb-2 bg-slate-500">
                <span class="lablel-text">
                    To: 
                </span>
                <span class="text-gray-300 font-bold">
                    {{selectedConversation.data.fullName}}
                </span>
            </div>
           <Messages></Messages>
            <MessageInput></MessageInput>
            </template>
    </div>
</template>


<style  scoped>

</style>