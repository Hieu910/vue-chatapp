import axios from 'axios';
import { reactive, ref,watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useConversationStore } from '../stores/conversation';

const useGetConversations = () => {
    const Toast = useToast()
    const conversations = reactive({data:[]})
    const { setConversations } = useConversationStore()
    const loading = ref(false)
    
    const getConversations = async () => {
        
        try {
            const res = await axios.get("/api/users")
            loading.value = true
            conversations.data = res.data
            setConversations(conversations.data)
            console.log(conversations)
        } catch (error) {
            Toast.error("error")
        }
        finally {
            loading.value = false
        }
    }

    getConversations();
    return { loading , conversations }

}

export default useGetConversations