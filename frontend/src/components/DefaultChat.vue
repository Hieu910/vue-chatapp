<script setup>

import { ref } from 'vue';

    const fullName = ref('Gumball') 
</script>
<template>
    <div class="flex items-center justify-center w-full h-full">
        <div class="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>
                Welcome 🎉🎉 {{fullName}}  🎉🎉
            </p>
            <p>
                Select a chat to start messaging
            </p>
            <i  class="iconify text-[100px]" :data-icon="'fluent-color:chat-multiple-20'" ></i> 
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>