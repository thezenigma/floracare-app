import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([
        { id: 1, title: 'Monstera Leaves Yellowing', date: 'Yesterday' },
        { id: 2, title: 'Orchid Repotting Guide', date: 'Last Week' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const startNewChat = () => {
        setMessages([]);
        setIsTyping(false);
    };

    const sendMessage = (text) => {
        const newUserMessage = { text, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        // If this is the very first message of a new chat, add it to sessions immediately
        if (messages.length === 0) {
            setSessions(prev => [
                { id: Date.now(), title: text.substring(0, 25) + '...', date: 'Just now' },
                ...prev
            ]);
        }

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                text: "That's an interesting question about your garden. Based on current seasonal patterns in your area, I recommend checking the soil moisture levels before taking action.", 
                sender: 'ai' 
            }]);
        }, 1500);
    };

    return (
        <ChatContext.Provider value={{ messages, sessions, isTyping, startNewChat, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
}
