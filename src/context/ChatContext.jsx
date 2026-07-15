import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { usePlantContext } from './PlantContext';
import { supabase } from '../lib/supabase';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const { session } = useAuth();
    const { plants } = usePlantContext();
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const ws = useRef(null);
    const sessionUuid = useRef(uuidv4());

    useEffect(() => {
        if (!session) return;
        const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/chat';
        ws.current = new WebSocket(wsUrl);
        
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 'success') {
                setIsTyping(false);
                setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
            } else if (data.status === 'error') {
                setIsTyping(false);
                setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
            }
        };

        ws.current.onclose = () => {
            setIsTyping(false);
        };

        ws.current.onerror = (error) => {
            setIsTyping(false);
            console.error("WebSocket error observed:", error);
        };

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, [session?.access_token]);

    useEffect(() => {
        if (!session?.user) return;
        const fetchSessions = async () => {
            const { data } = await supabase
                .from('chat_sessions')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });
            if (data) {
                const formatted = data.map(s => ({
                    id: s.id,
                    title: s.title || 'Chat Session',
                    date: new Date(s.created_at).toLocaleDateString()
                }));
                setSessions(formatted);
            }
        };
        fetchSessions();
    }, [session]);

    const startNewChat = () => {
        sessionUuid.current = uuidv4();
        setMessages([]);
        setIsTyping(false);
    };

    const loadSession = async (sessionId) => {
        sessionUuid.current = sessionId;
        setIsTyping(true);
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true });
            
        if (data) {
            setMessages(data.map(m => ({ sender: m.role, text: m.content })));
        }
        setIsTyping(false);
    };

    const deleteSession = async (sessionId) => {
        // Fetch all messages to find images before deleting
        const { data: sessionMsgs } = await supabase
            .from('messages')
            .select('content')
            .eq('session_id', sessionId);
            
        if (sessionMsgs) {
            const filesToDelete = [];
            sessionMsgs.forEach(msg => {
                const text = msg.content || '';
                const imgMatch = text.match(/(https?:\/\/[^\s]+supabase\.co\/storage[^\s\]]+)/i);
                
                if (imgMatch) {
                    const fullUrl = imgMatch[1];
                    const urlParts = fullUrl.split('/plant_images/');
                    if (urlParts.length > 1) {
                        filesToDelete.push(urlParts[1]); // The relative path inside bucket
                    }
                }
            });
            
            if (filesToDelete.length > 0) {
                await supabase.storage.from('plant_images').remove(filesToDelete);
            }
        }
        
        await supabase.from('chat_sessions').delete().eq('id', sessionId);
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (sessionUuid.current === sessionId) {
            startNewChat();
        }
    };

    const sendMessage = (text) => {
        if (!ws.current || !session) return;
        setMessages(prev => [...prev, { sender: 'user', text: text }]);
        setIsTyping(true);
        
        const plantIds = plants.map(p => p.id);
        
        ws.current.send(JSON.stringify({
            access_token: session.access_token,
            session_id: sessionUuid.current, 
            message: text,
            plant_ids: plantIds,
            chat_history: messages.map(m => `${m.sender}: ${m.text}`).join('\n')
        }));
    };

    return (
        <ChatContext.Provider value={{ messages, sessions, isTyping, startNewChat, sendMessage, loadSession, deleteSession }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);
