<script setup>
    import useLogout from '../hooks/userLogout';

    const { loading, logout } = useLogout()


</script>
<template>
    
    <div class="p-2">
        <button @click="logout" class="btn btn-ghost text-white">
            <i  class="iconify text-3xl" :data-icon="'tabler:logout-2'" ></i> 
        </button>
    </div>
</template>


<style scoped>

</style>


