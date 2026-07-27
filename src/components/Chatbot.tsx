import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Send, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Strands from './Strands';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = "/api/chat";

const getContextualQuestions = (pathname: string) => {
  if (pathname.startsWith('/plugins')) {
    return [
      "What are Vampro Plugins?",
      "How do I use the Voice Generator?",
      "Are there premium plugins?"
    ];
  } else if (pathname.startsWith('/docs')) {
    return [
      "How do I get started?",
      "What are the system requirements?",
      "Where is the API reference?"
    ];
  } else if (pathname.startsWith('/blog')) {
    return [
      "What is this blog about?",
      "How to speed up workflow?",
      "Are there tutorials?"
    ];
  } else {
    return [
      "What is Vampro?",
      "What products are offered?",
      "What services are provided?"
    ];
  }
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
      
      const systemPrompt = {
        role: 'system',
        content: `You are the Vampro AI Assistant, a highly intelligent and helpful expert on all things related to Vampro. Vampro is a creative lab at the intersection of creativity and technology, turning ideas into real experiences from films to software. Products include Voice Generator, etc.
Your goal is to provide accurate, helpful, and beautifully formatted answers to the user's questions.

Guidelines:
1. Base your answers on the CURRENT PAGE CONTENT provided below, but use your advanced reasoning to infer and provide comprehensive answers about Vampro's services and products even if exact keywords aren't present.
2. If asked about "services provided", synthesize a great answer from the content (e.g., film production, software development, creative tools).
3. ALWAYS format your responses neatly using Markdown. Use bolding for emphasis, bullet points for lists, and paragraphs for readability.
4. Include hyperlinks to relevant pages where appropriate (e.g., [Voice Generator](/plugins/voice-generator), [Contact](/contact)).
5. If the question is completely irrelevant to Vampro, politely decline.

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
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-70b-instruct",
          messages: apiMessages,
          temperature: 0.3,
          max_tokens: 1024,
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error ${response.status}: ${errText}`);
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
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`relative px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-md pointer-events-auto cursor-pointer flex items-center gap-2 ${
                isLight ? 'bg-white/90 text-slate-800 border border-slate-200 shadow-blue-500/10' : 'bg-[#07060F]/85 text-white border border-white/20 shadow-blue-500/30'
              }`}
              onClick={() => setIsOpen(true)}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Ask AI
              {/* Tooltip Arrow */}
              <div className={`absolute -bottom-[5px] right-[34px] w-2.5 h-2.5 rotate-45 border-r border-b ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#07060F] border-white/20'
              }`} />
            </motion.div>

            <button
              onClick={() => setIsOpen(true)}
              className={`h-20 w-20 sm:h-20 sm:w-20 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform overflow-hidden p-1 backdrop-blur-md pointer-events-auto ${
                isLight ? 'bg-white/90 border border-slate-200 shadow-blue-500/10' : 'bg-transparent border border-white/20 shadow-blue-500/30'
              }`}
            >
              <img src="/header.png" alt="Chat" className="w-full h-full object-cover rounded-xl" />
            </button>
          </motion.div>
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
            className={`fixed bottom-6 right-6 z-[60] w-full max-w-[90vw] sm:max-w-sm sm:w-96 h-[600px] max-h-[80vh] border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 outline-none focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.3)] ${
              isLight ? 'bg-white/95 border-slate-200' : 'bg-[#07060F]/85 border-white/10'
            }`}
            style={{ maxHeight: '80vh' }}
            tabIndex={-1}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsFocused(false);
              }
            }}
            onClick={() => document.getElementById('chatbot-input')?.focus()}
          >
            <div className="flex flex-col w-full h-full max-h-[80vh] flex-1 relative z-10 overflow-hidden">
            <div className={`flex items-center justify-between px-4 py-3 shrink-0 ${isLight ? 'bg-slate-50/90 border-b border-slate-200' : 'bg-white/5 border-b border-white/10'}`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg overflow-hidden border border-white/20">
                  <img src="/header.png" alt="Vampro Logo" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className={`font-black text-[15px] tracking-wider font-['Bank_Gothic'] ${isLight ? 'text-slate-900 drop-shadow-sm' : 'text-white'}`}>VAMPRO AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className={`text-[10px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className={`p-1.5 rounded-lg transition-colors ${isLight ? 'text-slate-900 hover:bg-slate-200/60' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                  title="Clear Chat"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${isLight ? 'text-slate-900 hover:bg-slate-200/60' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                  title="Close"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain space-y-4 flex flex-col scroll-smooth py-4 relative z-10"
              data-lenis-prevent={isFocused ? "true" : undefined}
            >
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex px-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm backdrop-blur-md ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-br-sm border border-blue-400/20 shadow-lg' 
                          : isLight
                            ? 'bg-white/95 text-slate-800 border border-slate-200/80 rounded-bl-sm shadow-md'
                            : 'bg-white/[0.03] text-slate-100 border border-white/10 rounded-bl-sm shadow-lg shadow-black/20'
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          a: ({node, ...props}) => <a className={`${isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'} underline transition-colors`} target="_blank" rel="noopener noreferrer" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0" {...props} />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className={`w-full relative flex items-center justify-center h-48 ${isLight ? 'opacity-100 saturate-[1.5]' : 'mix-blend-screen'}`}>
                    <div className="absolute inset-0 pointer-events-none">
                      <Strands scale={1.2} speed={0.2} waviness={0.8} thickness={1.2} />
                    </div>
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 text-base font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] tracking-wider"
                    >
                      Thinking...
                    </motion.span>
                  </div>
                )}

                {messages.length === 1 && !isLoading && (
                  <div className="flex flex-col gap-2 mt-4 px-4">
                    <button
                      onClick={() => handleSend("", true)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm font-medium backdrop-blur-md shadow-sm hover:-translate-y-0.5 transform duration-200 ${
                        isLight 
                          ? 'bg-blue-100/90 border-blue-300 text-blue-900 hover:bg-blue-100'
                          : 'bg-blue-500/5 border-blue-500/20 text-blue-300 hover:bg-blue-500/20'
                      }`}
                    >
                      Summarize Page
                    </button>
                    {getContextualQuestions(location.pathname).map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm font-medium backdrop-blur-md shadow-sm hover:-translate-y-0.5 transform duration-200 ${
                          isLight
                            ? 'bg-white/95 border-slate-300 text-slate-800 hover:bg-white hover:text-blue-700 shadow-md'
                            : 'bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className={`p-3 shrink-0 ${isLight ? 'bg-slate-50/90 border-t border-slate-200' : 'bg-white/5 border-t border-white/10'}`}>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                  <input
                    id="chatbot-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-sm shadow-inner ${
                      isLight 
                        ? 'bg-white/40 border-slate-300/50 focus:bg-white/70 text-slate-900 placeholder-slate-500'
                        : 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500'
                    }`}
                  />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-blue-700 transition-colors shadow-md"
                >
                  <Send size={16} className="ml-1" />
                </button>
              </form>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
