import axios from 'axios';
import { ref,watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const Toast = useToast();


const useLogin = () => {
    const userStore = useUserStore()
    const router = useRouter()
  const loading = ref(false)

  const login = async ({ username, password }) => {

        const success =  handleInput({ username, password })
        if(success) {
            loading.value = true
            try {
                let res = await axios.post("/api/auth/login",{
                    username, password
                })
                
 
                
            if(res.error){
                throw new Error(res.error)

            }
            //localStorage
            //store
            userStore.setUser(res.data)
            router.push("/home")
            } catch (error) {
                Toast.error("error")
            }
            finally {
                loading.value = false
                
            }
        }
  }


  return { loading, login }
}
const handleInput = ({ username, password }) => {
    if( !username || !password ) {
        Toast.error("Invalid Info")
        return false
    }

    if(password.length < 6 ){
        Toast.error("Password must be at least 6 characters")
        return false
    }

    return true
}
export default useLogin