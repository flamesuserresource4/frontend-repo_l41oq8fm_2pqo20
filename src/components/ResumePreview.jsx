import React, { forwardRef, useMemo } from 'react';

const colorMap = {
  slate: 'text-slate-800 dark:text-slate-100',
  emerald: 'text-emerald-700 dark:text-emerald-400',
  violet: 'text-violet-700 dark:text-violet-400',
  rose: 'text-rose-700 dark:text-rose-400',
};

const fontMap = {
  inter: 'font-inter',
  geist: 'font-geist',
  manrope: 'font-manrope',
  'ibm-plex-sans': 'font-ibm',
};

const TemplateClean = ({ data, color, font }) => (
  <div className={`p-6 md:p-8 bg-white text-slate-800 ${fontMap[font] || ''}`}>
    <div className="flex items-start gap-4">
      {data.photo && <img src={data.photo} alt="Profile" className="w-16 h-16 rounded-md object-cover" />}
      <div>
        <h2 className="text-2xl font-semibold">{data.name || 'Your Name'}</h2>
        <p className="text-sm text-slate-600">{data.title || 'Title / Role'}</p>
        <p className="text-xs text-slate-500 mt-1">{[data.email, data.phone, data.location].filter(Boolean).join(' • ')}</p>
      </div>
    </div>

    {data.summary && (
      <section className="mt-4">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>Summary</h3>
        <p className="text-sm leading-relaxed mt-1 whitespace-pre-wrap">{data.summary}</p>
      </section>
    )}

    {data.experience.length > 0 && (
      <section className="mt-4">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>Experience</h3>
        <div className="mt-1 space-y-3">
          {data.experience.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">{e.role} {e.company && <span className="text-slate-500 font-normal">• {e.company}</span>}</p>
                <p className="text-xs text-slate-500">{e.period}</p>
              </div>
              <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
                {e.bullets?.filter(Boolean).map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )}

    {data.education.length > 0 && (
      <section className="mt-4">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>Education</h3>
        <div className="mt-1 space-y-2">
          {data.education.map((e, i) => (
            <div key={i} className="text-sm">
              <p className="font-medium">{e.degree} {e.school && <span className="text-slate-500 font-normal">• {e.school}</span>}</p>
              <p className="text-xs text-slate-500">{e.period}</p>
              {e.details && <p className="mt-1">{e.details}</p>}
            </div>
          ))}
        </div>
      </section>
    )}

    {data.skills.length > 0 && (
      <section className="mt-4">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>Skills</h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span key={i} className={`inline-flex items-center px-2 py-1 rounded border text-xs ${
              color === 'slate' ? 'border-slate-200 text-slate-700' : 'border-slate-200 text-slate-700'
            }`}>{s.name}{s.level ? ` — ${s.level}` : ''}</span>
          ))}
        </div>
      </section>
    )}

    {data.achievements.length > 0 && (
      <section className="mt-4">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>Achievements</h3>
        <ul className="list-disc ml-5 mt-1 text-sm space-y-1">
          {data.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>
    )}
  </div>
);

const ResumePreview = forwardRef(({ data, template, color, font }, ref) => {
  const Component = useMemo(() => {
    switch (template) {
      case 'elegant':
        return TemplateClean; // reuse clean for now with styling controlled by color/font
      case 'bold':
        return TemplateClean;
      default:
        return TemplateClean;
    }
  }, [template]);

  return (
    <div ref={ref} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <Component data={data} color={color} font={font} />
    </div>
  );
});

export default ResumePreview;
