import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'



export const useUserStore = defineStore('user', () => {
  const localData = localStorage.getItem('user_data')
  const user = reactive({data: localData ? JSON.parse(localData): null }) 

 
  
  function setUser(value) {
    user.data = value
    if(!value){
      localStorage.removeItem('user_data')
    } 
    else {
      localStorage.setItem('user_data', JSON.stringify(value))
    }

    
  }

  return { user, setUser }
})
