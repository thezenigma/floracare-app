import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import ScrollReveal from '../components/ui/ScrollReveal';
import ReactMarkdown from 'react-markdown';

export default function AIAssistant() {
    const { messages, isTyping, sendMessage } = useChat();
    const { user } = useAuth();
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() && !selectedImage) return;
        
        let messageText = inputValue;
        setIsUploading(true);
        
        if (selectedImage && user) {
            const fileExt = selectedImage.name.split('.').pop();
            const fileName = `${user.id}/chat_${Date.now()}.${fileExt}`;
            const { data } = await supabase.storage.from('plant_images').upload(fileName, selectedImage);
            
            if (data) {
                const { data: publicUrlData } = supabase.storage.from('plant_images').getPublicUrl(fileName);
                messageText = `[IMAGE: ${publicUrlData.publicUrl}] ${messageText}`;
            }
        }
        
        sendMessage(messageText.trim());
        setInputValue('');
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsUploading(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const renderMessage = (msg, idx) => {
        let text = msg.text || '';
        let imageUrl = null;
        
        // Aggressive extraction: finds ANY supabase storage URL in the text
        const imgMatch = text.match(/(https?:\/\/[^\s]+supabase\.co\/storage[^\s\]]+)/i);
        
        if (imgMatch) {
            imageUrl = imgMatch[1];
            // Aggressively rip out any remaining brackets, tags, or the URL itself from the text
            text = text.replace(/\[IMAGE:[\s\S]*?\]/gi, '')
                       .replace(imageUrl, '')
                       .replace('[IMAGE:', '')
                       .replace(']', '')
                       .trim();
        }

        if (msg.sender === 'user') {
            return (
                <div key={idx} className="flex flex-col items-end mb-4 sm:mb-6 animate-slide-up space-y-2">
                    {imageUrl && (
                        <div className="max-w-[85%] sm:max-w-[75%]">
                            <img src={imageUrl} alt="User attached" className="max-w-full h-auto rounded-2xl rounded-tr-sm object-cover max-h-64 shadow-sm" />
                        </div>
                    )}
                    {text && (
                        <div className={`bg-primary text-white dark:text-[#002113] rounded-2xl px-4 sm:px-5 py-3 max-w-[85%] sm:max-w-[75%] shadow-sm ${imageUrl ? 'rounded-tr-2xl' : 'rounded-tr-sm'}`}>
                            <p className="font-body-md text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div key={idx} className="flex justify-start mb-6">
                <div className="w-8 h-8 rounded-full bg-primary-container/20 flex-shrink-0 mt-1 flex items-center justify-center mr-3">
                    <span className="material-symbols-outlined text-[18px] text-primary">psychiatry</span>
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-2xl bg-surface text-on-surface rounded-tl-none border border-outline-variant/30 font-body-md shadow-sm">
                    <div className="space-y-3">
                        <ReactMarkdown 
                            components={{
                                p: ({node, ...props}) => <p className="leading-relaxed whitespace-pre-wrap" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-semibold text-primary" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
                                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-primary" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-primary" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-md font-semibold mt-2 mb-1" {...props} />
                            }}
                        >
                            {text.replace(/\\n/g, '\n')}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 flex flex-col relative min-h-0 w-full pb-24">
            {messages.length === 0 ? (
                /* Welcome Screen */
                <div className="flex-1 flex flex-col md:justify-center text-center px-4 transition-opacity duration-700 animate-stagger h-full overflow-y-auto pt-8 md:pt-4 max-w-5xl mx-auto">
                    <ScrollReveal direction="down" className="flex flex-col items-center">
                        <div className="mb-6 animate-bounce">
                            <div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center p-4 mx-auto">
                                <span className="material-symbols-outlined text-[40px] text-primary">psychiatry</span>
                            </div>
                        </div>
                        <h1 className="font-display-lg text-[36px] md:text-[48px] text-primary font-bold tracking-tight mb-4">
                            Hello! I'm FloraCare AI
                        </h1>
                        <p className="font-body-lg text-[18px] text-on-surface-variant max-w-2xl mb-12">
                            How can I help your garden thrive today? I can diagnose leaf spots, suggest seasonal planting, or optimize your irrigation schedule.
                        </p>
                    </ScrollReveal>

                    {/* Quick Action Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl pb-20">
                        {[
                            { icon: 'photo_camera', text: 'Identify plant health issues from a photo' },
                            { icon: 'calendar_today', text: 'Create a summer watering schedule' },
                            { icon: 'eco', text: 'Recommend organic pest control for roses' }
                        ].map((action, idx) => (
                            <button key={idx} onClick={() => { sendMessage(action.text); setInputValue(''); }} className="p-6 bg-surface hover:bg-surface-container-high transition-all rounded-xl text-left flex flex-col gap-2 group shadow-sm border border-outline-variant/30 hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary">{action.icon}</span>
                                <span className="font-label-md text-[14px] text-on-surface">{action.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Chat History */
                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scroll-smooth">
                    <div className="max-w-4xl mx-auto space-y-6 pb-20">
                        {messages.map((msg, idx) => renderMessage(msg, idx))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary-container/20 flex-shrink-0 mt-1 flex items-center justify-center mr-3">
                                    <span className="material-symbols-outlined text-[18px] text-primary">psychiatry</span>
                                </div>
                                <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-surface text-on-surface rounded-tl-none border border-outline-variant/30 font-body-md shadow-sm">
                                    <p className="animate-pulse">Analyzing your botanical inquiry...</p>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            )}

            {/* Sticky Input Area */}
            <div className="absolute bottom-0 left-0 w-full py-4 bg-gradient-to-t from-background via-background/90 to-transparent">
                <div className="max-w-4xl mx-auto px-4">
                    {selectedImage && (
                        <div className="mb-2 ml-4 flex items-center gap-2">
                            <div className="relative inline-block">
                                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-outline-variant/30 shadow-sm" />
                                <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[12px]">close</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSend} className="relative bg-surface shadow-md shadow-primary/5 rounded-full border border-outline-variant/30 p-2 flex items-center focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleImageChange}
                        />
                        <div className="flex items-center gap-1 ml-2">
                            <button onClick={() => fileInputRef.current?.click()} type="button" className="p-2 text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90" title="Upload Image">
                                <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                            </button>
                            <button type="button" className="hidden md:block p-2 text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90" title="Attach Files">
                                <span className="material-symbols-outlined text-[20px]">attach_file</span>
                            </button>
                        </div>
                        <input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isUploading}
                            className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 px-2 md:px-4 font-body-md text-[14px] md:text-[16px] text-on-surface placeholder:text-on-surface-variant/60 outline-none disabled:opacity-50" 
                            placeholder={isUploading ? "Uploading image..." : "Ask FloraCare AI..."} 
                            type="text"
                        />
                        <div className="flex items-center gap-1 mr-1 md:mr-2">
                            <button type="button" className="p-2 text-primary hover:bg-surface-container-high rounded-full transition-colors active:scale-90" title="Voice Input">
                                <span className="material-symbols-outlined text-[20px]">mic</span>
                            </button>
                            <button type="submit" disabled={(!inputValue.trim() && !selectedImage) || isUploading} className="w-10 h-10 bg-primary text-white dark:text-[#002113] rounded-full flex items-center justify-center transition-all hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isUploading ? (
                                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-3 font-label-sm text-[12px] text-on-surface-variant/60">
                        FloraCare AI may provide gardening advice based on common knowledge. Always consult local experts for rare species.
                    </p>
                </div>
            </div>
        </div>
    );
}
