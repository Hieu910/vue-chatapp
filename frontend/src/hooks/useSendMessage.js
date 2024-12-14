import axios from 'axios';
import { ref } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useConversationStore } from '../stores/conversation';


const Toast = useToast();


const useSendMessage = () => {

    const { messages, selectedConversation, setSelectedConversation , setMessages} = useConversationStore()
  const loading = ref(false)

  const sendMessage = async (message) => {

            loading.value = true
            try {
                let res = await axios.post(`/api/message/send/${selectedConversation.data._id}`,{
                   message
                })

                console.log(res)
            if(res.error){
                throw new Error(res.error)
            }
            setMessages([...messages.data, res.data])
           
            } catch (error) {
                console.error(error)
                Toast.error("error")
            }
            finally {
                loading.value = false
                
            }
        
  }

  


  return { loading, sendMessage }
}

export default useSendMessage