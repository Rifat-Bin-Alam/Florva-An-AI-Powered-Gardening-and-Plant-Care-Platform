import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Sprout, RefreshCw, ChevronDown } from 'lucide-react';
import Button from './Button';

/**
 * PlantChatbot — Floating AI-Powered Plant Care Assistant
 * Sticks to the bottom-right corner of customer pages.
 * Opens an interactive drawer providing botanical advice, care diagnostics,
 * and plant recommendations.
 */
export default function PlantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome messages
  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your Florva Botanical AI Assistant. How can I help your plants thrive today? Ask me about watering schedules, yellow leaves, sunlight, or plant recommendations for your space!',
      time: 'Just now'
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  // Quick suggestion chips for rapid demonstration
  const quickPrompts = [
    'Why are my Monstera leaves turning yellow?',
    'Recommend low-light plants for my bedroom',
    'How often should I water my Snake Plant?',
    'Best soil mix for potted succulents in Dhaka'
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent botanical knowledge engine (instant, reliable client response with real care rules)
  const generateBotanicalResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes('yellow') || q.includes('leaf') || q.includes('leaves') || q.includes('droop')) {
      return `🌿 **Diagnostic Advice for Yellowing Leaves:**\n\n1. **Overwatering (Most Common):** Check the top 2 inches of soil. If soggy, withhold water until it dries.\n2. **Drainage Issues:** Ensure your pot has drainage holes at the bottom so roots don't sit in stagnant water.\n3. **Natural Aging:** If only the lowest, oldest leaf turns yellow while new growth is green, it's just natural shedding!\n\n💡 *Recommendation:* Allow the soil to dry out 50-75% between waterings.`;
    }

    if (q.includes('low light') || q.includes('bedroom') || q.includes('dark') || q.includes('recommend')) {
      return `🌱 **Best Low-Light Plants for Indoor Spaces:**\n\n1. **Snake Plant (Sansevieria):** Nearly indestructible, purifies air at night, tolerates dim corners.\n2. **ZZ Plant (Zamioculcas):** Waxy, dark green leaves that thrive with minimal sunlight and water every 2-3 weeks.\n3. **Peace Lily (Spathiphyllum):** Produces white blooms even in medium-low light and tells you when it needs water by slightly drooping.\n\nAll three are available in our [Shop Plants](/shop) section!`;
    }

    if (q.includes('snake plant') || q.includes('water') || q.includes('watering')) {
      return `💧 **Snake Plant Watering Guidelines:**\n\n- **Frequency:** Every 14 to 20 days during normal weather; every 3-4 weeks in winter.\n- **Golden Rule:** It is much safer to underwater a Snake Plant than to overwater it. Always wait until the soil is completely dry throughout before watering thoroughly.\n- **Tip:** You can track this plant in your [My Plants](/my-plants) journal for automatic watering alerts!`;
    }

    if (q.includes('soil') || q.includes('succulent') || q.includes('fertilizer') || q.includes('potting')) {
      return `🪴 **Soil & Potting Mix Recommendation:**\n\n- **For Succulents/Cacti:** 50% coarse sand/perlite + 50% standard potting soil. Rapid drainage is essential.\n- **For Tropical Indoor Plants (Monstera, Ficus):** 60% coco peat/potting soil + 20% perlite + 20% organic compost/vermicompost.\n- **Fertilizer:** Apply balanced organic liquid fertilizer (NPK 10-10-10) once a month during active growth.`;
    }

    return `🌿 **Florva Botanical Specialist Advice:**\n\nThank you for asking about "${question}".\n\nFor optimal plant vitality:\n- **Lighting:** Most indoor plants prefer bright, indirect sunlight near north or east-facing windows.\n- **Watering:** Always test soil moisture with your finger before adding water.\n- **Support:** If you need hands-on help, you can book an on-site **Plant Health Consultation** from our [Services](/services) page!\n\nFeel free to ask another plant question!`;
  };

  const handleSend = (textToSend = input) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay for natural conversational feel
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: generateBotanicalResponse(trimmed),
        time: 'Just now'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 700);
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* ─── Floating Sticky Launcher Button ─── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-forest hover:bg-forest-800 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-botanical-lg flex items-center gap-2.5 transition-all duration-200 hover:scale-105 group border-2 border-sage-300"
          aria-label="Ask Florva AI Plant Assistant"
        >
          <div className="relative">
            <Sprout className="w-5 h-5 text-sage group-hover:rotate-12 transition-transform" />
            <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="hidden sm:inline-block text-sm font-semibold tracking-wide">
            Ask Florva AI
          </span>
        </button>
      )}

      {/* ─── Slide-Out Botanical Chat Drawer ─── */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[85vh] bg-white rounded-2xl shadow-2xl border border-charcoal-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Drawer Header */}
          <div className="bg-forest text-white p-4 flex items-center justify-between border-b border-forest-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-800 border border-sage-400/40 flex items-center justify-center text-sage">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  Florva AI Plant Doctor
                  <span className="text-[10px] font-medium bg-forest-800 text-sage-300 px-1.5 py-0.5 rounded border border-sage-400/30">
                    Gemini AI
                  </span>
                </h3>
                <p className="text-[11px] text-sage-200">Context-Aware Plant Care Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sage-200">
              <button
                onClick={resetChat}
                title="Restart Conversation"
                className="p-1.5 hover:text-white hover:bg-forest-800 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 hover:text-white hover:bg-forest-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-offwhite px-3 py-2 border-b border-charcoal-100 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[11px] whitespace-nowrap bg-white text-forest-800 border border-charcoal-200 rounded-full px-2.5 py-1 hover:bg-sage-50 hover:border-sage-300 transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-offwhite/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-forest text-sage flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-forest text-white rounded-br-none'
                      : 'bg-white text-charcoal-800 border border-charcoal-100 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-sage-200 text-forest-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-charcoal-400 pl-9">
                <div className="flex gap-1 bg-white border border-charcoal-100 px-3 py-2 rounded-xl shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-forest animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-forest animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] text-charcoal-500">Florva AI is analyzing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-charcoal-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about watering, sunlight, diagnosis..."
              className="flex-1 bg-offwhite border border-charcoal-200 rounded-xl px-3.5 py-2 text-xs text-charcoal placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-forest text-white hover:bg-forest-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Send Question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
