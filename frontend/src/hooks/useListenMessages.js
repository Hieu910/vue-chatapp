import axios from 'axios';
import { ref, watchEffect ,inject} from 'vue';
import { useUserStore } from '../stores/user';
import { useConversationStore } from '../stores/conversation';
import notificationSound from "../assets/sound/notification.mp3"

const useListenMessages = () => {

const { messages, setMessages, selectedConversation ,conversations, setConversations} = useConversationStore()
const {  socket } = inject('socket')
const hasNewMessage = ref('')
const { user } = useUserStore()

  watchEffect((onCleanup) => {
   socket.data?.on("newMessage",({newMessage,conversation})=>{
        const sound = new Audio(notificationSound)
        const promise = sound.play()
       
          if (promise !== undefined) {
            promise.then(_ => {
              // Autoplay started!
            }).catch(error => {
              // Autoplay was prevented.
            });
          }
        
       let newConversation = conversation.participants.find((user) => { 
           return conversations.data.some((item)=>{
                item._id != user._id
           })
       });
       
        if(newConversation){

          setConversations([...conversations.data,  newConsersation ])
          hasNewMessage.value =  newConversation._id
        } else {
          hasNewMessage.value =  conversation.participants.find((item) => { 
                return user.data?._id != item._id
          })._id

          if( hasNewMessage.value == selectedConversation.data?._id){
            setMessages([...messages.data, newMessage])
          }
        }
        console.log(hasNewMessage.value)
   })

    onCleanup(()=>{
       hasNewMessage.value = ''
        socket.data?.off("newMessage")
    })
  })
  const setHasNewMessage = (value) => {
    hasNewMessage.value = value
  }

  return { hasNewMessage, setHasNewMessage } 
}


export default useListenMessages