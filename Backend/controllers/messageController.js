import Conversation from '../models/conversation.js';
import Message from '../models/message.js';
import { UserMap, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({ members: { $all: [id, senderId] } });

        if (!conversation) {
            conversation = await Conversation.create({ members: [id, senderId] });
        }

        const newMessage = await Message.create({ senderId, receiverId: id, message: message });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            await Promise.all([newMessage.save(), conversation.save()]);
        }

        io.to(UserMap.get(id)).emit('recieve-message', newMessage);

        res.status(200).json({ message: 'Message sent' });
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({ members: { $all: [id, userId] } }).populate('messages');

        if (!conversation) return res.status(200).json({ messages: [] });

        return res.status(200).json({ messages: conversation.messages });

    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ message: 'Server error' });
    }

}