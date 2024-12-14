import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"


export const sendMessage = async (req, res)=>{
      try {
         const  { message } = req.body
         const { id: receiverId } = req.params
        const  senderId = req.user._id

        let conversation = await Conversation.findOne({
          participants: {
            $all: [senderId,receiverId]
          }
        })

        if(!conversation){
          conversation = await Conversation.create({
              participants: [senderId,receiverId],
          })
        }

        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        })

        if(newMessage){
          conversation.messages.push(newMessage._id)
        }
    
        //run parallel
        await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json(newMessage)

      } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
      }
}

// get message between user and another user
export const getMessages = async (req, res) => {
  try {
    const {id: chattingUserId } = req.params
    const  senderId = req.user._id

    const conversation = await Conversation.findOne({
          participants: {$all: [senderId, chattingUserId]}
    }).populate("messages"); // FILL THE MESSAGE ARRAY WITH DATA FROM MESSAGES COLLECTION 

    if(!conversation) {
      return res.status(200).json([])
    }
    const messages = conversation.messages;

    res.status(200).json(messages);

  } catch (error) {
    
    res.status(500).json({ error: "Internal server error" })
  }
}