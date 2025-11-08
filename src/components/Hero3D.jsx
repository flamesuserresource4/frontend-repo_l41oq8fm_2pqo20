import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero3D = () => {
  return (
    <section className="relative w-full h-[420px] md:h-[560px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-10">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              2025-ready resume builder
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
              Craft resumes that pass ATS and impress humans
            </h1>
            <p className="mt-3 md:mt-4 text-slate-300 max-w-2xl">
              Modern templates, real-time preview, and smart suggestions—built for speed and clarity on any device.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#builder" className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg hover:opacity-90 transition shadow">
                Start building <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#builder" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
                Explore features
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
