<script setup>
    import { ref } from "vue";
import { useConversationStore } from "../stores/conversation";

    const { conversations, setSelectedConversation, setFilters } = useConversationStore()

    const searchText = ref("")
    const createDebounce = () => {
        let timeout = null;
        return function (fnc, delayMs) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 1000);
        };
    }
    const debounce = createDebounce()
    const onInput = (e)=>{
     
        searchText.value = e.target.value
        debounce(()=>{
          return setFilters(e.target.value.trim())
        })
       
      
    }
</script>
<template>
    <div class="p-1">
        <label class="input input-bordered flex rounded-full items-center gap-2 bg bg-gray-800">
        <input @input="onInput"  :value="searchText"  type="text" class="grow text-gray-300" placeholder="Search" />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
        </label>
    </div>
</template>


<style scoped>

</style>