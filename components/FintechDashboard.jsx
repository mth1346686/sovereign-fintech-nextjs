'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Coins,
  TrendingUp,
  Building,
  Landmark,
  ShieldCheck,
  Sliders,
  Sparkles,
  Percent,
  PieChart,
  Activity,
  ArrowUpRight,
  Lock,
  Volume2,
  VolumeX,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ASSET_CLASSES = [
  { name: 'أذون الخزانة المصرية (T-Bills 1Y)', val: 75.0, yieldPct: 27.25, color: '#FFD700', icon: Landmark, note: 'عائد خالي من المخاطر مضمون من المركزي' },
  { name: 'محفظة سبائك الذهب الفعلي (24K Gold)', val: 42.5, yieldPct: 38.60, color: '#F59E0B', icon: Coins, note: 'تحوط تضخمي وسيولة عالمية فورية' },
  { name: 'أسهم البورصة المصرية القيادية (EGX30)', val: 38.2, yieldPct: 29.40, color: '#00F0FF', icon: TrendingUp, note: 'CIB، إي فاينانس، طلعت مصطفى، السويدي' },
  { name: 'أصول عقارية مدرة للإيجار (Real Estate)', val: 29.7, yieldPct: 14.80, color: '#10B981', icon: Building, note: 'أصول تجارية وإدارية بالتجمع والشيخ زايد' },
];

export default function FintechDashboard() {
  const [tbillsPct, setTbillsPct] = useState(40);
  const [goldPct, setGoldPct] = useState(25);
  const [equityPct, setEquityPct] = useState(20);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Remaining for Real Estate
  const realEstatePct = Math.max(0, 100 - tbillsPct - goldPct - equityPct);

  // Audio Chime
  const playChime = (freq = 880) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch(e) {}
  };

  // Rebalancing Computations
  const simResults = useMemo(() => {
    const totalAUM = 185.4; // Million EGP
    const weightedYield = (
      (tbillsPct * 27.25) +
      (goldPct * 38.60) +
      (equityPct * 29.40) +
      (realEstatePct * 14.80)
    ) / 100;
    const annualCashflow = (totalAUM * (weightedYield / 100));
    const monthlyCashflow = (annualCashflow / 12) * 1000000;
    const safetyIndex = Math.round(tbillsPct * 0.95 + goldPct * 0.85 + realEstatePct * 0.80 + equityPct * 0.40);
    return {
      weightedYield: weightedYield.toFixed(2),
      annualCashflowM: annualCashflow.toFixed(2),
      monthlyCashflowK: Math.round(monthlyCashflow / 1000).toLocaleString(),
      safetyIndex
    };
  }, [tbillsPct, goldPct, equityPct, realEstatePct]);

  const triggerRebalance = () => {
    playChime(1175);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#10B981', '#00F0FF']
    });
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans pb-20">
      
      {/* Top Gold Progress Laser */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-fin-gold via-fin-emerald to-fin-cyan shadow-[0_0_15px_#FFD700] z-50" />

      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-4 glass-fin border-b border-amber-500/20 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            <Landmark className="w-5 h-5 text-black font-extrabold" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2 font-arabic">
              منصة إدارة الثروات والأصول السيادية
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                Next.js 14 • Framer Motion
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-arabic">محفظة استثمارات النخبة والأصول المصرية • القاهرة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playChime(soundEnabled ? 440 : 880);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-fin text-xs font-mono text-slate-300 hover:border-amber-400"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span>{soundEnabled ? 'صوت الواجهة: مفعل' : 'مكتوم'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Executive Portfolio Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-3xl glass-fin relative overflow-hidden border-r-4 border-r-amber-400"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
                <ShieldCheck className="w-4 h-4" /> محفظة الأصول المعتمدة 2026
              </div>
              <h2 className="text-2xl font-black text-white font-arabic">
                إجمالي الأصول المدارة: <span className="text-amber-400 font-mono">185.40</span> مليون جنيه مصري
              </h2>
              <p className="text-xs text-slate-300 mt-1 font-arabic max-w-2xl">
                متوسط العائد السنوي الموزون الحالي <span className="text-emerald-400 font-bold font-mono">+24.8%</span> مع استثمار 75 مليون جنيه في أذون الخزانة الحكومية بعائد 27.25% خالي من المخاطر.
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">معدل الأمان الرأسمالي</span>
              <p className="text-xl font-black font-mono text-emerald-400">92/100 A+</p>
            </div>
          </div>
        </motion.div>

        {/* 4 Asset Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSET_CLASSES.map((asset, idx) => {
            const Icon = asset.icon;
            return (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, borderColor: asset.color }}
                className="p-5 rounded-2xl glass-fin relative cursor-pointer group"
                onClick={() => playChime(600 + idx * 100)}
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${asset.color}20`, color: asset.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-800" style={{ color: asset.color }}>
                    +{asset.yieldPct}% عائد
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 font-arabic mb-1">{asset.name}</h3>
                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-2xl font-black font-mono text-white">{asset.val.toFixed(1)}</span>
                  <span className="text-xs font-bold text-slate-400 font-arabic">مليون ج.م</span>
                </div>
                <p className="text-[11px] text-slate-400 font-arabic border-t border-slate-800/80 pt-2.5">
                  {asset.note}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Asset Rebalancing Simulator (Framer Motion + React State) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-8 rounded-3xl glass-fin relative border border-amber-400/40 shadow-[0_0_35px_rgba(255,215,0,0.1)]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
                <Sliders className="w-4 h-4" /> محاكي إعادة توزيع المحفظة الاستثمارية
              </div>
              <h2 className="text-xl font-black text-white font-arabic">
                محاكاة العائد السريعة والتدفق النقدي الشهري بالجنيه المصري
              </h2>
              <p className="text-xs text-slate-400 font-arabic mt-0.5">
                حرك نسب الأصول لمشاهدة التغير الفوري في العائد السنوي والسيولة الشهرية.
              </p>
            </div>
            <button
              onClick={triggerRebalance}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold text-xs tracking-wider uppercase font-arabic flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" /> تطبيق التوزيع الأمثل
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* T-Bills Slider */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-mono font-arabic">
                <span className="text-slate-300">أذون الخزانة المصرية (27.25%)</span>
                <span className="text-amber-400 font-bold">{tbillsPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={tbillsPct}
                onChange={e => setTbillsPct(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-arabic">ضمان سيادي مع عائد دوري معفى من مخاطر التذبذب.</p>
            </div>

            {/* Gold Slider */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-mono font-arabic">
                <span className="text-slate-300">سبائك الذهب الفعلي (38.6%)</span>
                <span className="text-yellow-500 font-bold">{goldPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={goldPct}
                onChange={e => setGoldPct(parseInt(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-arabic">درع الحماية التاريخي ضد انخفاض القوة الشرائية.</p>
            </div>

            {/* Equities Slider */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-mono font-arabic">
                <span className="text-slate-300">الأسهم القيادية بالبورصة (29.4%)</span>
                <span className="text-cyan-400 font-bold">{equityPct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={equityPct}
                onChange={e => setEquityPct(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 font-arabic">العقارات المدرة تأخذ المتبقي تلقائياً ({realEstatePct}%).</p>
            </div>
          </div>

          {/* Realtime Output Computed Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-400/10 via-emerald-400/10 to-cyan-400/10 border border-amber-400/30 flex flex-wrap items-center justify-around gap-4 text-center">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-arabic">العائد السنوي الموزون</span>
              <p className="text-2xl font-black font-mono text-amber-400">+{simResults.weightedYield}%</p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-arabic">الأرباح السنوية الصافية</span>
              <p className="text-2xl font-black font-mono text-emerald-400">{simResults.annualCashflowM} مليون ج.م</p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-arabic">التدفق الشهري المتولد</span>
              <p className="text-2xl font-black font-mono text-cyan-400">{simResults.monthlyCashflowK} ألف ج.م / شهر</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
