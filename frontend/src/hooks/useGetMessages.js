import axios from 'axios';
import { ref, watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useConversationStore } from '../stores/conversation';


const Toast = useToast();


const useGetMessages = () => {

const { messages, selectedConversation, setSelectedConversation , setMessages} = useConversationStore()
  const loading = ref(false)
  watchEffect(async (onCleanup) => {
    let isActive = true
    const getMessages = async (message) => {
        
        try {
        let res = await axios.get(`/api/message/${selectedConversation.data._id}`)
        loading.value = true

        if(res.error){
            throw new Error(res.error)
        }
        if(isActive){
            setMessages( res.data )
         
        }
       
        } catch (error) {
          
            Toast.error("error")
        }
        finally {
            loading.value = false
            
        }
        
    }
    if (selectedConversation.data?._id) getMessages();

    onCleanup(()=>{
        isActive = false
    })
  })

 

 

  return { loading, messages }
}



export default useGetMessages