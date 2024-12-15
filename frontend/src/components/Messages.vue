<script setup>
import Message from './Message.vue';
import useGetMessages from '../hooks/useGetMessages';
import { watchEffect,useTemplateRef } from 'vue';
import useListenMessages from '../hooks/useListenMessages';

    const {loading, messages} = useGetMessages();
	 useListenMessages()
  	const chatContainer = useTemplateRef('chatContainers')
	watchEffect((onCleanup)=>{
			if(!messages.data.length) return
			setTimeout(() => {
			chatContainer.value?.at(-1).scrollIntoView({ behavior: "smooth" });
			}, 100);
	})
	
</script>
<template>
	
    <div  class="px-4 pb-4 flex-1 overflow-auto">
        <template v-if="loading">
            <div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
        </template>
		<template v-else>	
			<div  v-for="message in messages.data" :key="message._id" ref="chatContainers" >
					<Message  :messageData="message"/>
			</div>
		</template>
          
            
    </div>
     
 
</template>


<style  scoped>

</style>