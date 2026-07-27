import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Send, Trash2, Loader2, Sparkles, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = "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";
const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const PREDEFINED_QUESTIONS = [
  "What is Vampro?",
  "How do I use the Voice Generator?",
  "Explore Plugins",
  "Read Documentation"
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  
  // Theme logic matching Navbar
  const isLight = theme === 'light' || location.pathname.startsWith('/blog');

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am the Vampro AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getPageContext = () => {
    const mainContent = document.querySelector('main')?.innerText || document.body.innerText;
    // Limit context length to avoid huge token costs
    return mainContent.slice(0, 5000); 
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hi! I am the Vampro AI Assistant. How can I help you today?' }]);
  };

  const handleSend = async (text: string, isSummaryRequest = false) => {
    if (!text.trim() && !isSummaryRequest) return;

    const userMessage: Message = { role: 'user', content: text };
    
    // Add user message to UI immediately
    if (!isSummaryRequest) {
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
    } else {
      setMessages((prev) => [...prev, { role: 'user', content: 'Please summarize this page.' }]);
    }
    
    setIsLoading(true);

    try {
      const pageContext = getPageContext();
      
      const systemPrompt: Message = {
        role: 'system',
        content: `You are a helpful, professional AI assistant for the Vampro website.
        Your primary source of truth is the current page content provided below. 
        If the user asks a question that is entirely irrelevant to Vampro or the page content, logically deny answering it (e.g. "I can only answer questions related to Vampro and this website."). 
        Do not hallucinate features or products.
        
        CURRENT PAGE CONTENT:
        ${pageContext}`
      };

      const apiMessages = [systemPrompt, ...messages.filter(m => m.role !== 'system')];
      
      if (!isSummaryRequest) {
        apiMessages.push(userMessage);
      } else {
        apiMessages.push({ role: 'user', content: "Please summarize the current page content provided in the system prompt." });
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          messages: apiMessages,
          temperature: 0.2,
          max_tokens: 512,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      if (data.error) {
         throw new Error(data.error.message || "Unknown API error");
      }
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${error.message || 'Network error (CORS or offline)'}. Please try again later.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform overflow-hidden p-1 ${
              isLight ? 'bg-white border border-slate-200 shadow-indigo-500/10' : 'bg-[#0B0A15] border border-white/10 shadow-indigo-500/30'
            }`}
          >
            <img src="/header.png" alt="Chat" className="w-full h-full object-cover rounded-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 z-[60] w-full max-w-[90vw] sm:max-w-sm sm:w-96 border rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0B0A15] border-white/10'
            }`}
            style={{ maxHeight: '80vh', height: '600px' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 shrink-0 ${isLight ? 'bg-slate-50 border-b border-slate-200' : 'bg-white/5 border-b border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg overflow-hidden border border-white/20">
                  <img src="/header.png" alt="Vampro Logo" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-widest font-bank-gothic ${isLight ? 'text-[#07060F]' : 'text-white'}`}>VAMPRO AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat}
                  title="Clear Chat"
                  className={`p-2 rounded-lg transition-colors ${isLight ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${isLight ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isLight ? 'bg-white' : ''}`}>
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : isLight
                          ? 'bg-slate-100 text-slate-700 border border-slate-200 rounded-bl-sm'
                          : 'bg-white/10 text-slate-200 border border-white/5 rounded-bl-sm'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 ${
                    isLight ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                  }`}>
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-3 shrink-0 ${isLight ? 'bg-slate-50 border-t border-slate-200' : 'bg-white/5 border-t border-white/10'}`}>
              {/* Quick Actions */}
              <div className="flex flex-nowrap overflow-x-auto gap-2 mb-3 pb-1 scrollbar-hide">
                <button
                  onClick={() => handleSend("", true)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors text-[11px] font-medium ${
                    isLight 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                      : 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30'
                  }`}
                >
                  <FileText size={12} />
                  Summarize Page
                </button>
                {PREDEFINED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors text-[11px] font-medium ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Sparkles size={12} />
                    {q}
                  </button>
                ))}
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors ${
                    isLight 
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-[#07060F] border-white/20 text-white placeholder-slate-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
