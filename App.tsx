
import React, { useState } from 'react';
import { YUVANSH_INFO, PRICING_DATA } from './constants';
import PricingCard from './components/PricingCard';
import ChatInterface from './components/ChatInterface';
import Button from './components/Button';
import BotMenu from './components/BotMenu';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAssistant = () => {
    setShowChat(true);
    // Use a small delay to ensure the DOM has rendered the chat section before scrolling
    setTimeout(() => {
      const chatSection = document.getElementById('chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white bg-[#030712]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-black italic shadow-lg shadow-blue-500/20">Y</div>
            <span className="text-xl font-extrabold tracking-tighter uppercase font-display hidden sm:inline-block">{YUVANSH_INFO.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleOpenAssistant} variant="primary" className="hidden sm:flex px-6 py-2">
              Chat with Me
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="home" className="relative py-24 md:py-32 overflow-hidden px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>
          
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
              Master Developer
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 font-display tracking-tight leading-[1.1]">
              I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">BIG THINGS</span> FOR BIG MINDS.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
              From five-dollar extensions to 70-million dollar masterpieces. Yuvansh turns your imagination into high-performance digital reality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => scrollToSection('pricing')} variant="primary" className="w-full sm:w-auto text-lg px-10 py-4">
                View My Pricing
              </Button>
              <Button onClick={handleOpenAssistant} variant="outline" className="w-full sm:w-auto text-lg px-10 py-4">
                Discuss Your Idea
              </Button>
            </div>
          </div>
        </section>

        {/* AI Brain Section (Conditional) */}
        {showChat && (
          <section id="chat" className="py-20 bg-gray-950/50 px-6 scroll-mt-24 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black font-display mb-4 text-white">The Brain of Yuvansh</h2>
                <p className="text-gray-500 max-w-lg mx-auto">Ask me to make anything. I'll show you the path from idea to production-ready product.</p>
              </div>
              <ChatInterface />
              <div className="text-center mt-8">
                <button 
                  onClick={() => setShowChat(false)} 
                  className="text-gray-500 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Close Assistant
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-black/20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black font-display mb-4">Pricing Page</h2>
                <p className="text-gray-400 text-lg max-w-xl">
                  Yuvansh's services are tiered for impact. Whether you need a simple tool or a super-app ecosystem, the quality is unmatched.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_DATA.map((item) => (
                <PricingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-purple-800 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 font-display uppercase tracking-tighter italic">Ready to make anything?</h2>
                <p className="text-xl md:text-2xl text-blue-50/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Direct connection is just a click away. Reach out through any of the channels below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <a href={`mailto:${YUVANSH_INFO.email}`} className="flex flex-col items-center gap-3 p-8 bg-white/5 backdrop-blur-md rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
                    <div className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <span className="font-bold text-white text-lg">{YUVANSH_INFO.email}</span>
                  </a>
                  <a href={`tel:${YUVANSH_INFO.phone}`} className="flex flex-col items-center gap-3 p-8 bg-white/5 backdrop-blur-md rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
                    <div className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <span className="font-bold text-white text-lg">{YUVANSH_INFO.phone}</span>
                  </a>
                  <a href={`https://${YUVANSH_INFO.website}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-8 bg-white/5 backdrop-blur-md rounded-3xl hover:bg-white/10 transition-all border border-white/10 group">
                    <div className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <span className="font-bold text-white text-lg">{YUVANSH_INFO.website}</span>
                  </a>
                </div>
                <Button onClick={handleOpenAssistant} className="bg-white text-blue-600 hover:bg-blue-50 mx-auto px-12 py-5 text-xl font-black tracking-tight rounded-2xl shadow-xl">
                  Launch Project Assistant
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bot Floating Menu */}
      <BotMenu 
        onOpenAssistant={handleOpenAssistant} 
        whatsappNumber="+91 99112 58733" 
      />

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-black italic">Y</div>
              <span className="text-lg font-extrabold tracking-tighter uppercase font-display">{YUVANSH_INFO.name}</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
              Crafting high-end digital infrastructure for the visionaries of tomorrow.
            </p>
          </div>
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} {YUVANSH_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xl text-gray-600">
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
