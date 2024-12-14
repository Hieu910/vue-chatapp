<script setup>
    import Sidebar from '../../components/Sidebar.vue';
    import MessageContainer from '../../components/MessageContainer.vue';
    
</script>
<template>
    <div class="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar/>
        <MessageContainer />
    </div>
</template>


<style  scoped>

</style>