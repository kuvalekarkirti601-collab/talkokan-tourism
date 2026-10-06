import React, { useState } from 'react';
import { Sparkles, X, Send, Loader2, Bot, Compass, Copy, Check } from 'lucide-react';

interface AiLocalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiLocalGuideModal: React.FC<AiLocalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [districtContext, setDistrictContext] = useState('All Kokan');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    '3-Day Monsoon road trip itinerary from Mumbai to Malvan',
    'Must-try seafood joints & authentic Khanaval in Ratnagiri',
    'Useful Marathi phrases & cultural etiquette for tourists',
    'Essential packing checklist for Tarkarli scuba & Amboli monsoon ghats'
  ];

  const handleAsk = async (textToAsk?: string) => {
    const promptToUse = textToAsk || query;
    if (!promptToUse.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: promptToUse,
          district: districtContext,
          type: 'recommendation'
        })
      });
      const data = await res.json();
      if (data.answer) {
        setResponse(data.answer);
      } else {
        setResponse(data.error || 'Failed to generate guide recommendations.');
      }
    } catch (err) {
      console.error('AI Guide error:', err);
      setResponse('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-8 backdrop-blur-xl">
        
        {/* Header */}
        <div className="p-6 bg-slate-950/70 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-amber-400 flex items-center justify-center text-slate-950 shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-serif-kokan text-xl font-bold text-white">Talkokan AI Local Assistant</h3>
              <p className="text-xs text-amber-300 font-medium">Powered by Server-Side Gemini API</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* District Context Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-300 font-medium">District Focus:</span>
            <select
              value={districtContext}
              onChange={(e) => setDistrictContext(e.target.value)}
              className="p-2 bg-slate-950/80 text-amber-300 font-bold rounded-xl border border-white/15 focus:outline-none"
            >
              <option value="All Kokan">Whole Kokan Region</option>
              <option value="Sindhudurg">Sindhudurg (Malvan/Tarkarli)</option>
              <option value="Ratnagiri">Ratnagiri (Ganpatipule/Velas)</option>
              <option value="Raigad">Raigad (Alibaug/Janjira)</option>
              <option value="Palghar">Palghar (Kelwa/Coastal)</option>
            </select>
          </div>

          {/* Quick Prompts */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Quick Suggestions</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(p);
                    handleAsk(p);
                  }}
                  className="text-[11px] px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 transition-all text-left backdrop-blur-sm"
                >
                  💡 {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="relative">
            <textarea
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about Kokan routes, local food spots, monsoon safety, or Marathi phrases..."
              className="w-full p-3.5 bg-slate-950/80 text-white placeholder-slate-400 text-xs rounded-2xl border border-white/15 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading || !query.trim()}
              className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-400 hover:to-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask AI Guide</span>
                </>
              )}
            </button>
          </div>

          {/* AI Response Box */}
          {response && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-teal-500/40 space-y-3 animate-fadeIn backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Talkokan Local AI Recommendation</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white text-xs flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {response}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
