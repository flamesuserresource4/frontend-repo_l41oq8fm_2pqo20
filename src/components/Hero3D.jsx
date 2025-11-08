import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-10">
        <div>
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
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
