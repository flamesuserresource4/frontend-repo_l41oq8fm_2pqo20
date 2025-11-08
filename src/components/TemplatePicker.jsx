import React from 'react';
import { Sparkles, Layout, Palette, Type } from 'lucide-react';

const templates = [
  { id: 'clean', name: 'Clean', desc: 'Minimal, ATS-friendly' },
  { id: 'elegant', name: 'Elegant', desc: 'Subtle accents, balanced' },
  { id: 'bold', name: 'Bold', desc: 'Stronger headings & contrast' },
];

const colors = [
  { id: 'slate', name: 'Slate', className: 'bg-slate-600' },
  { id: 'emerald', name: 'Emerald', className: 'bg-emerald-600' },
  { id: 'violet', name: 'Violet', className: 'bg-violet-600' },
  { id: 'rose', name: 'Rose', className: 'bg-rose-600' },
];

const TemplatePicker = ({ selectedTemplate, setSelectedTemplate, color, setColor, font, setFont }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-slate-500" />
          <h3 className="font-medium">Templates</h3>
        </div>
        <span className="text-xs text-slate-500">Choose a style</span>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`group rounded-lg border text-left p-3 hover:shadow-sm transition ${
              selectedTemplate === t.id ? 'border-slate-900 dark:border-white ring-1 ring-slate-900/10 dark:ring-white/10' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-slate-500">{t.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-500" />
            <h3 className="font-medium">Accent color</h3>
          </div>
          <span className="text-xs text-slate-500">Make it yours</span>
        </div>
        <div className="flex items-center gap-2">
          {colors.map(c => (
            <button
              key={c.id}
              onClick={() => setColor(c.id)}
              className={`w-7 h-7 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${c.className} ${color === c.id ? 'ring-current' : 'ring-transparent'}`}
              aria-label={c.name}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-slate-500" />
            <h3 className="font-medium">Font</h3>
          </div>
          <span className="text-xs text-slate-500">Typography</span>
        </div>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="input"
        >
          <option value="inter">Inter</option>
          <option value="geist">Geist</option>
          <option value="manrope">Manrope</option>
          <option value="ibm-plex-sans">IBM Plex Sans</option>
        </select>
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-xs text-slate-600 dark:text-slate-300">
        Pro tip: keep headings consistent and align dates to the right for quick scanning.
      </div>
    </div>
  );
};

export default TemplatePicker;
