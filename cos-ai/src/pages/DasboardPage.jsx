import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Flame, BrainCircuit, Calendar, 
  Clock, Plus, ArrowRight, Zap, Target
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export default function DasboardPage() {
  return (
    <div className="min-h-screen bg-[#0D0D12] text-white p-6 md:p-10 font-sans selection:bg-[#5E6AD2]">
      
      {/* BACKGROUND GLOW */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#5E6AD2]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#A371F7]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4D4D4]">
              Good Morning, Shive.
            </h1>
            <p className="text-[#8A8A93] text-sm mt-1">Here is your orchestrated day. 3 tasks pending.</p>
          </div>
          
          <button className="h-10 px-5 rounded-lg bg-gradient-to-r from-[#5E6AD2] to-[#A371F7] text-white text-sm font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(94,106,210,0.4)] transition-all">
            <Plus className="w-4 h-4" /> Quick Add (Cmd+K)
          </button>
        </header>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* COLUMN 1: AI & Analytics (Spans 4) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* AI Recommendation */}
            <GlassCard highlight>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#5E6AD2]/20 flex items-center justify-center border border-[#5E6AD2]/30">
                  <BrainCircuit className="w-4 h-4 text-[#A371F7]" />
                </div>
                <h2 className="text-sm font-medium text-[#D4D4D4] uppercase tracking-wider">AI Pulse</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-white">
                You have a solid 2-hour block open at 14:00. I recommend sliding the <span className="text-[#A371F7] font-medium border-b border-[#A371F7]/30">Backend Refactor</span> here while your energy is historically high.
              </p>
              <button className="mt-4 text-xs font-medium bg-[#5E6AD2]/20 hover:bg-[#5E6AD2]/40 text-[#A371F7] px-3 py-1.5 rounded transition-colors w-full text-left flex justify-between items-center">
                Accept Schedule <ArrowRight className="w-3 h-3" />
              </button>
            </GlassCard>

            {/* Productivity Score & Burnout */}
            <GlassCard>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs text-[#8A8A93] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1"><Target className="w-3 h-3"/> Score</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-[#22C55E] to-emerald-700">92</span>
                      <span className="text-xs text-[#8A8A93] mb-1">/100</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs text-[#8A8A93] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1"><Flame className="w-3 h-3"/> Burnout Risk</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-semibold text-[#F59E0B]">Low</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#22C55E] to-[#F59E0B] w-1/4 rounded-full" />
                </div>
                <p className="text-xs text-[#737373] mt-3">You've paced yourself well this week. Kept deep work under 4 hours/day.</p>
            </GlassCard>

            {/* Calendar Widget */}
            <GlassCard>
               <h2 className="text-sm font-medium text-[#D4D4D4] uppercase tracking-wider mb-4 flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-[#8A8A93]" />
                 Upcoming
               </h2>
               <div className="space-y-4">
                 {[
                   { time: "11:30 AM", title: "Daily Sync", type: "meeting" },
                   { time: "01:00 PM", title: "Lunch Buffer", type: "break" },
                   { time: "02:00 PM", title: "Deep Work: Database", type: "focus" }
                 ].map((evt, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <span className="text-xs text-[#737373] w-14">{evt.time}</span>
                     <div className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                        evt.type === 'meeting' ? 'bg-[#5E6AD2]/10 border-[#5E6AD2]/20 text-[#A371F7]' :
                        evt.type === 'break' ? 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]' :
                        'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]'
                     }`}>
                       {evt.title}
                     </div>
                   </div>
                 ))}
               </div>
            </GlassCard>

          </div>

          {/* COLUMN 2: The Core Plan (Spans 8) */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* The Timeline / Priority Tasks */}
            <GlassCard className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#F59E0B]" /> Today's Orchestration
                </h2>
                <div className="flex gap-2">
                   <button className="text-xs text-[#8A8A93] hover:text-white px-3 py-1 rounded bg-white/5">Board</button>
                   <button className="text-xs text-white px-3 py-1 rounded bg-white/15 shadow border border-white/10">Timeline</button>
                </div>
              </div>

              <div className="space-y-3">
                 {[
                   { title: "Review pull requests from staging", project: "Engineering", energy: "High", time: "45m", complete: true },
                   { title: "Design the Productivity Dashboard", project: "Design UI/UX", energy: "High", time: "2h", complete: false, active: true },
                   { title: "Write Express.js server routes", project: "Backend", energy: "Med", time: "1.5h", complete: false },
                   { title: "Draft investor update email", project: "Admin", energy: "Low", time: "30m", complete: false }
                 ].map((task, i) => (
                   <motion.div 
                     layout
                     key={i} 
                     className={`group relative flex items-center gap-4 p-4 rounded-xl border ${
                       task.active 
                        ? 'bg-gradient-to-r from-[#5E6AD2]/10 to-transparent border-[#5E6AD2]/30 shadow-[inset_4px_0_0_#5E6AD2]' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5'
                     } transition-all cursor-pointer`}
                   >
                      <button className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        task.complete ? 'bg-[#5E6AD2] border-[#5E6AD2]' : 'border-[#8A8A93] group-hover:border-[#5E6AD2]'
                      }`}>
                        {task.complete && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${task.complete ? 'text-[#737373] line-through' : 'text-[#D4D4D4]'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5 opacity-80">
                          <span className="text-[10px] text-[#A371F7] uppercase tracking-widest font-semibold">{task.project}</span>
                          <span className="text-[10px] text-[#8A8A93] flex items-center gap-1"><Clock className="w-3 h-3"/> {task.time}</span>
                          <span className={`text-[10px] px-1.5 rounded-sm ${
                            task.energy === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                            task.energy === 'Low' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                          }`}>⚡ {task.energy}</span>
                        </div>
                      </div>

                      {task.active && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                           <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A371F7] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5E6AD2]"></span>
                          </span>
                        </div>
                      )}
                   </motion.div>
                 ))}
              </div>
            </GlassCard>

          </div>
        </div>
      </div>
    </div>
  );
}
