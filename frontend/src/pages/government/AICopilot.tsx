import React, { useState } from 'react';
import { Lightbulb, Send, Bot, User, Loader2 } from 'lucide-react';
import { apiService } from '../../services/api';

export default function AICopilot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to SkillPulse Policy Copilot. Ask me about Maharashtra\'s skilling outcomes, district performance, or skill gaps.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Why is Nashik underperforming Pune?",
    "Which courses have the highest attrition?",
    "What skills are employers demanding that training providers are missing?",
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await apiService.askCopilot(text);
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.answer }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while analyzing the data." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center">
          <Lightbulb className="mr-2 text-primary-600" /> AI Policy Copilot
        </h1>
        <p className="text-sm text-neutral-500 mt-1">Analytical assistant for skilling outcomes.</p>
      </div>

      <div className="card flex-1 flex flex-col overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-neutral-200 text-neutral-600' : 'bg-primary-100 text-primary-700'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-lg text-sm leading-relaxed ${msg.role === 'user' ? 'bg-neutral-100 text-neutral-900' : 'bg-white border border-neutral-200 text-neutral-800'}`}>
                {msg.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 max-w-4xl">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-lg text-sm bg-white border border-neutral-200 flex items-center">
                <Loader2 className="animate-spin text-primary-600 mr-2" size={16} /> Analyzing state data...
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-neutral-50 border-t border-neutral-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(q)}
                className="text-xs bg-white border border-neutral-300 text-neutral-600 px-3 py-1.5 rounded-full hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors"
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask SkillPulse about Maharashtra's outcomes..."
              className="w-full pl-4 pr-12 py-3 bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              disabled={loading}
            />
            <button 
              onClick={() => handleSend(input)}
              className="absolute right-2 p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors"
              disabled={!input.trim() || loading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
