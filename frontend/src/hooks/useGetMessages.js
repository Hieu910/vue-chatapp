import axios from 'axios';
import { ref, watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useConversationStore } from '../stores/conversation';


const Toast = useToast();


const useGetMessages = () => {

const { messages, selectedConversation, setSelectedConversation , setMessages} = useConversationStore()
  const loading = ref(false)
  watchEffect(async () => {
    const getMessages = async (message) => {

        loading.value = true
        try {
            let res = await axios.get(`/api/message/${selectedConversation.data._id}`)
        if(res.error){
            throw new Error(res.error)
        }
        console.log(res)
        setMessages( res.data )
       
        } catch (error) {
          
            Toast.error("error")
        }
        finally {
            loading.value = false
            
        }
    
    }
    if (selectedConversation.data?._id) getMessages();
  })

 

 

  return { loading, messages }
}



export default useGetMessages