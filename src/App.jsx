import React, { useMemo, useRef, useState } from 'react';
import Hero3D from './components/Hero3D';
import TemplatePicker from './components/TemplatePicker';
import EditorPanel from './components/EditorPanel';
import ResumePreview from './components/ResumePreview';
import { Download, FileText, Files, Wand2, RefreshCw } from 'lucide-react';

const defaultData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  photo: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  achievements: [],
};

const App = () => {
  const [data, setData] = useState(defaultData);
  const [template, setTemplate] = useState('clean');
  const [color, setColor] = useState('emerald');
  const [font, setFont] = useState('inter');
  const previewRef = useRef(null);

  const download = async (type) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/export/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, template, color, font }),
      });
      if (!res.ok) throw new Error('Failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.${type}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      const content = JSON.stringify(data, null, 2);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.${type === 'txt' ? 'txt' : 'json'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => setData(defaultData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <Hero3D />

        <div id="builder" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
            <EditorPanel data={data} setData={setData} />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="lg:sticky lg:top-6 space-y-6">
              <TemplatePicker
                selectedTemplate={template}
                setSelectedTemplate={setTemplate}
                color={color}
                setColor={setColor}
                font={font}
                setFont={setFont}
              />

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Export</h3>
                    <p className="text-xs text-slate-500">Download your resume in multiple formats</p>
                  </div>
                  <button onClick={reset} className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700">
                    <RefreshCw className="w-3.5 h-3.5" /> Reset
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={()=>download('pdf')} className="btn bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                  <button onClick={()=>download('docx')} className="btn">
                    <Files className="w-4 h-4" /> DOCX
                  </button>
                  <button onClick={()=>download('txt')} className="btn">
                    <FileText className="w-4 h-4" /> TXT
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">ATS-optimized exports with clean structure.</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Live Preview</h3>
                <ResumePreview ref={previewRef} data={data} template={template} color={color} font={font} />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-medium">Tips</h3>
                </div>
                <ul className="text-sm list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Use strong action verbs and quantify impact.</li>
                  <li>Mirror keywords from the job description.</li>
                  <li>Keep to one page unless you have 8+ years of experience.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input { @apply w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40; }
        .btn { @apply inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-[0.98]; }
        .icon-btn { @apply inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 p-2 hover:bg-slate-50 dark:hover:bg-slate-800; }
        .font-inter { font-family: Inter, ui-sans-serif, system-ui, -apple-system; }
        .font-geist { font-family: Geist, ui-sans-serif, system-ui, -apple-system; }
        .font-manrope { font-family: Manrope, ui-sans-serif, system-ui, -apple-system; }
        .font-ibm { font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system; }
      `}</style>
    </div>
  );
};

export default App;
