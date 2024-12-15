import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'



export const useConversationStore = defineStore('conversation', () => {

  const selectedConversation = reactive({data:null}) 
  const messages = reactive({data:[]})
  const conversations = reactive({data:[]})
  const filters = reactive({data:""})
  
  const setSelectedConversation =  (value) =>{
    selectedConversation.data = value    
  }

  const setMessages = (value) =>{ 
    messages.data = value
  }

  const setConversations = (value) =>{ 
    conversations.data = value
  }

  const setFilters = (value) =>{ 
    filters.data = value.toLowerCase()
  }
  

  return { messages,conversations, filters, selectedConversation , setSelectedConversation ,setConversations, setFilters,  setMessages }
})
