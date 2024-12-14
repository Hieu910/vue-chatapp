import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'



export const useConversationStore = defineStore('conversation', () => {

  const selectedConversation = reactive({data:null}) 
  const messages = reactive({data:[]})

    
  
  const setSelectedConversation =  (value) =>{
    selectedConversation.data = value    
  }

  const setMessages = (value) =>{ 
    messages.data = value
  }

  return { messages, selectedConversation , setSelectedConversation , setMessages }
})
