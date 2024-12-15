
<script setup>
import { ref } from 'vue';
import useSendMessage from '../hooks/useSendMessage';

    const message = ref("")
    const { loading , sendMessage } = useSendMessage()

    const handleSubmit =async (e)=>{
        if(!message.value) return
        await sendMessage(message.value)
        message.value = ""
    }

</script>

<template>
        <form class="flex px-4 my-3 gap-3" @submit.prevent="handleSubmit">
            <input type="text" placeholder="Type here" v-model="message" class="input bg-opacity-5 w-full max-w-xs" />
            <button class="btn btn-neutral" type="submit">
                <i  class="iconify text-xl" :data-icon="'fa:send'" ></i> 
                Send
            </button>
           
        </form>
</template>



<style scoped>

</style>