<script setup>

import Searchbar from './Searchbar.vue';
import Conversations from './Conversations.vue';
import LogoutButton from './LogoutButton.vue'; 

</script>
<template>
    <div class="flex flex-col border-r border-slate-500 pr-0">
        <Searchbar/>
        <div class="divider px-3"></div>
        <Conversations/>
        <LogoutButton/>
    </div>
</template>


<style scoped>


</style>