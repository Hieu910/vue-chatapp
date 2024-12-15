import axios from 'axios';
import { ref,watchEffect } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
const Toast = useToast();


const useSignUp = () => {
    const userStore = useUserStore()
    const router = useRouter()
  const loading = ref(false)

  const signup = async ({fullName, username, password, confirmPassword,gender }) => {
        const success =  handleInput({fullName, username, password, confirmPassword,gender })
        if(success) {
            
            try {
                let res = await axios.post("/api/auth/signup",{
                    fullName, username, password, confirmPassword,gender
                })
                loading.value = true
               
                
            if(res.error){
                throw new Error(res.error)

            }
            //localStorage
            //store
            userStore.setUser(res.data)
            router.push("/")
            } catch (error) {
                Toast.error(error)
            }
            finally {
                loading.value = false
            }
        }
  }


  return { loading, signup }
}
const handleInput = ({fullName, username, password, confirmPassword,gender }) => {
    if(!fullName || !username || !password || !gender || !confirmPassword) {
        Toast.error("Invalid Info")
        return false
    }

    if(password !== confirmPassword) {
        Toast.error("Password not match")
        return false
    }

    if(password.length < 6 ){
        Toast.error("Password must be at least 6 characters")
        return false
    }

    return true
}
export default useSignUp