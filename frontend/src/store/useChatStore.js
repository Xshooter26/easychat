import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";



export const useChatStore = create((set,get) => ({
    messages : [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isTyping: false,
    typingUsers: new Set(),


    getUsers : async () => {
        set({isUsersLoading: true});

        try{
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading: false});
        }
    },

    getMessages :async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (err) {
            toast.error(err.response.data.message);
        }finally{
set({isMessagesLoading: false});
        }
    },

    sendMessages : async(messageData) =>{
        const {selectedUser,messages} = get()
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages: [...messages,res.data]});
        }
        catch(error){
            toast.error(error.response.data.message);
        }

    },

    setSelectedUser : (selectedUser) => set({selectedUser}),

    getRealTimeMessages : () =>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;



        socket.on("newMessage",(newMessage) =>{
            if(newMessage.senderId !== selectedUser._id) return;
            set({messages:[...get().messages,newMessage]  //updating the state

            });
        });
    },

    dontGetRealTimeMessages : () =>{
        const socket = useAuthStore.getState().socket;
        if(socket) socket.off("newMessage");
    },

    setTyping: (userId, isTyping) => {
        set((state) => ({
            typingUsers: isTyping 
                ? new Set(state.typingUsers).add(userId)
                : new Set([...state.typingUsers].filter(id => id !== userId))
        }));
    },

    sendTypingStatus: (isTyping) => {
        const { socket } = useAuthStore.getState();
        const { selectedUser } = get();
        
        if (socket && selectedUser) {
            socket.emit(isTyping ? "typing" : "stop typing", {
                senderId: useAuthStore.getState().authUser._id,
                receiverId: selectedUser._id
            });
        }
    }
}));