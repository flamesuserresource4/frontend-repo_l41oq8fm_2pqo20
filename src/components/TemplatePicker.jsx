import React from 'react';
import { Sparkles, Layout, Palette } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="w-4 h-4 text-slate-500" />
        <h3 className="font-medium">Templates</h3>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`group rounded-lg border text-left p-3 hover:shadow-sm transition ${
              selectedTemplate === t.id ? 'border-slate-900 dark:border-white' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-slate-500">{t.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-slate-500" />
          <h3 className="font-medium">Accent color</h3>
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
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-slate-500" />
          <h3 className="font-medium">Font</h3>
        </div>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2"
        >
          <option value="inter">Inter</option>
          <option value="geist">Geist</option>
          <option value="manrope">Manrope</option>
          <option value="ibm-plex-sans">IBM Plex Sans</option>
        </select>
      </div>
    </div>
  );
};

export default TemplatePicker;
