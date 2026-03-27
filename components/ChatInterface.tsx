
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import Button from './Button';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm Yuvansh's AI brain. Want to make anything? From a $5 extension to a $70M pricing page, let's build the future." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden mx-auto mt-12">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white relative">
            <i className="fa-solid fa-robot"></i>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Brain of Yuvansh</h4>
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Neural Core Active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-gray-800/80 text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 px-5 py-4 rounded-2xl rounded-tl-none flex flex-col gap-2 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest animate-pulse">Assistant is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-800 bg-gray-900/50 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your next big project..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-500"
        />
        <Button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="aspect-square p-0 w-12 h-12 flex items-center justify-center rounded-full"
        >
          <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
