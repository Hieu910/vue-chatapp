import axios from 'axios';
import { ref,watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
const Toast = useToast();


const useLogout = () => {
const userStore = useUserStore()

  const loading = ref(false)
  const router = useRouter()
  const logout = async () => {
       
         
            try {
                let res = await axios.post("/api/auth/logout")
                loading.value = true
            
            userStore.setUser(null)
            router.push("/")
            } catch (error) {
                throw new Error(error)
            }
            finally {
                loading.value = false
              
            }
        
  }


  return { loading, logout }
}

export default useLogout