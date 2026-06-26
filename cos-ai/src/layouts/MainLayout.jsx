import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BrainCircuit, CalendarClock, ShieldAlert,
  Zap, ChevronRight, Play, Code, MessageCircle, Briefcase
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D12] text-white selection:bg-[#5E6AD2] selection:text-white font-sans overflow-hidden">
      
      {/* --- RADIAL BACKGROUND GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5E6AD2] to-[#A371F7] blur-[120px] rounded-[100%]" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0D0D12]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-[#A371F7]" />
            <span className="text-xl font-bold tracking-tight text-white">CoS.ai</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A3A3A3]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Wall of Love</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/signin">
            <button className="text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors hidden md:block">
              Sign In
            </button>
            </a>
            <a href="/dashboard">
            <button className="h-10 px-6 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
              Initialize Dashboard
            </button>
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 h-screen">
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#A3A3A3] mb-6 leading-tight">
              Your workload.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5E6AD2] to-[#A371F7]">
                Orchestrated.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A8A93] max-w-2xl mx-auto mb-10 font-normal">
              Stop maintaining passive to-do lists. CoS.ai actively breaks down your goals, intelligent slots them into your calendar, and rescues missed deadlines before they happen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signin" className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#5E6AD2] to-[#A371F7] text-white font-semibold text-lg flex items-center gap-2 hover:shadow-[0_0_30px_rgba(163,113,247,0.4)] hover:scale-[1.02] transition-all">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="h-14 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg flex items-center gap-2 hover:bg-white/10 transition-all">
                <Play className="w-5 h-5" /> View Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- AI DASHBOARD PREVIEW --- */}
      <section className="px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto rounded-2xl border border-white/10 bg-[#16161D]/80 backdrop-blur-2xl p-4 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative overflow-hidden"
        >
          {/* Mockup Top Bar */}
          <div className="flex items-center gap-2 mb-6 opacity-50">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="h-12 w-2/3 bg-white/5 rounded-lg border border-white/5 animate-pulse" />
              <div className="h-24 w-full bg-[#5E6AD2]/10 rounded-lg border border-[#5E6AD2]/20 flex items-center px-6">
                 <p className="text-[#A371F7] text-sm">AI Pulse: Rescheduling your afternoon to protect the 4:00 PM core deliverable.</p>
              </div>
              <div className="h-16 w-full bg-white/5 rounded-lg border border-white/5" />
              <div className="h-16 w-full bg-white/5 rounded-lg border border-white/5" />
            </div>
            <div className="bg-[#0D0D12] rounded-xl border border-white/5 p-6 h-full flex flex-col justify-end">
               <div className="w-full h-3/4 rounded-lg bg-gradient-to-t from-[#A371F7]/20 to-transparent border-b-2 border-[#A371F7]" />
               <p className="text-xs text-[#A3A3A3] mt-4 uppercase tracking-widest text-center">Focus Analytics</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0D0D12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Intelligence at every layer.</h2>
            <p className="text-[#8A8A93] text-lg max-w-2xl mx-auto">Not just a checklist. CoS.ai uses advanced LLMs to act precisely like an executive assistant.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#5E6AD2]/20 flex items-center justify-center mb-6 border border-[#5E6AD2]/30 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6 text-[#A371F7]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">AI Brain Dump Breakdowns</h3>
              <p className="text-[#8A8A93] text-sm leading-relaxed">
                Type "Launch marketing campaign." The AI instantly generates a 12-step structured JSON timeline with energy & time estimations.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center mb-6 border border-[#F59E0B]/30 group-hover:scale-110 transition-transform">
                <CalendarClock className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Priority Engine Routing</h3>
              <p className="text-[#8A8A93] text-sm leading-relaxed">
                We analyze your Google Calendar blank spaces and map deep-work tasks to your peak energy hours automatically.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="group rounded-2xl bg-[#EF4444]/5 border border-[#EF4444]/20 p-8 hover:bg-[#EF4444]/10 transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <div className="bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">Patent Pending</div>
               </div>
              <div className="w-12 h-12 rounded-xl bg-[#EF4444]/20 flex items-center justify-center mb-6 border border-[#EF4444]/30 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Deadline Rescue Mode</h3>
              <p className="text-[#8A8A93] text-sm leading-relaxed">
                Math shows you'll miss Friday's deadline? The AI pops up, offers to drop 3 low-priority tasks, and repopulates your timeline to save the project.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 p-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#16161D] to-[#0D0D12] border border-white/5 p-8 md:p-16 relative">
          <h2 className="text-3xl font-semibold mb-12 text-center">Zero to Executed in 3 Steps</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[28px] md:before:ml-[50%] before:-translate-x-px md:before:mx-auto before:w-0.5 before:bg-gradient-to-b before:from-[#5E6AD2] before:to-transparent before:h-full">
            
            {[
              { title: "The Input dump", desc: "Just type your chaotic, unformatted thoughts into the command bar." },
              { title: "AI Computes", desc: "Our engine maps dependencies, time requirements, and blocks your calendar." },
              { title: "You Focus", desc: "Follow the linear path. Let the AI handle rescheduling if you get distracted." }
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0D0D12] border-2 border-[#5E6AD2] text-[#A371F7] font-bold text-xl z-10 shrink-0 md:order-1 md:group-odd:-ml-[28px] md:group-even:-mr-[28px] shadow-[0_0_15px_rgba(94,106,210,0.5)]">
                  {i + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#5E6AD2]/50 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[#8A8A93]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 border-t border-white/5 bg-[#0D0D12]/50">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-center text-3xl font-semibold mb-12">Engineers and PMs love it.</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                  { name: "Sarah J.", role: "Senior Prod. Manager", text: "Rescue mode literally saved my Q3 launch. It stripped out my fluff tasks when I fell 4 hours behind." },
                  { name: "David K.", role: "Full Stack Dev", text: "The Dark Theme is pristine. But the AI breaking down my 'deploy multi-tenant auth' into 8 accurate steps is mindblowing." },
                  { name: "Elena R.", role: "Startup Founder", text: "It feels like I hired a $100k/yr Chief of Staff. I just dump my anxiety into the prompt and it gives me a schedule." }
              ].map((t, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                      <div className="flex text-[#F59E0B] mb-4 gap-1">
                          {[1,2,3,4,5].map(s => <Zap key={s} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-[#A3A3A3] text-sm mb-6 leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#A371F7]" />
                          <div>
                              <p className="text-white text-sm font-medium">{t.name}</p>
                              <p className="text-[#737373] text-xs">{t.role}</p>
                          </div>
                      </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5E6AD2]/10 pointer-events-none" />
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Stop managing tasks.<br/>Start executing strategy.</h2>
            <p className="text-[#8A8A93] mb-10 text-lg">Join 10,000+ top performers letting AI handle the logistics of their workday.</p>
            <Link to="/signin" className="h-16 px-10 rounded-2xl bg-white text-[#0D0D12] hover:bg-[#E2E2E2] font-semibold text-lg flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105 w-fit">
                Initialize Your AI Staff <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-[#737373] text-sm mt-4">14-day free trial. No credit card required.</p>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#0D0D12] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <BrainCircuit className="w-6 h-6 text-[#A371F7]" />
               <span className="text-xl font-bold tracking-tight text-white">CoS.ai</span>
            </div>
            <p className="text-[#737373] text-sm mb-6 max-w-xs">Building the intelligent orchestration layer for the modern knowledge worker.</p>
            <div className="flex gap-4">
                <Code className="w-5 h-5 text-[#737373] hover:text-white cursor-pointer" />
                <MessageCircle className="w-5 h-5 text-[#737373] hover:text-white cursor-pointer" />
                <Briefcase className="w-5 h-5 text-[#737373] hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-3 text-[#737373] text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
              </ul>
          </div>
          <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-3 text-[#737373] text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Developer API</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              </ul>
          </div>
          <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-3 text-[#737373] text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-[#737373] text-sm pt-8 border-t border-white/5">
            © 2026 CoS.ai Inc. All rights reserved. Built for the VibeShip Hackathon.
        </div>
      </footer>
    </div>
  );
}
