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

const SectionTitle = ({ children, color }) => (
  <h3 className={`text-sm font-semibold uppercase tracking-wide ${colorMap[color]}`}>{children}</h3>
);

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
        <SectionTitle color={color}>Summary</SectionTitle>
        <p className="text-sm leading-relaxed mt-1 whitespace-pre-wrap">{data.summary}</p>
      </section>
    )}

    {data.experience.length > 0 && (
      <section className="mt-4">
        <SectionTitle color={color}>Experience</SectionTitle>
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
        <SectionTitle color={color}>Education</SectionTitle>
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
        <SectionTitle color={color}>Skills</SectionTitle>
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
        <SectionTitle color={color}>Achievements</SectionTitle>
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
        return TemplateClean; // placeholder for variant styling
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
