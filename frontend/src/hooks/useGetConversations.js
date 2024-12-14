import axios from 'axios';
import { reactive, ref,watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';


const useGetConversations = () => {

    const conversations = reactive({data:[]})
    const loading = ref(false)
    
    const getConversations = async () => {
        loading.value = true
        try {
            const res = await axios.get("/api/users")
           
            conversations.data = res.data

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