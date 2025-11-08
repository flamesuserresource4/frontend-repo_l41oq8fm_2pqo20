import React, { useState } from 'react';
import { PlusCircle, Trash2, GripVertical, Upload, Type } from 'lucide-react';

const SectionHeader = ({ title, onAdd }) => (
  <div className="flex items-center justify-between mb-2">
    <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</h4>
    {onAdd && (
      <button onClick={onAdd} className="text-xs inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700">
        <PlusCircle className="w-4 h-4" /> Add
      </button>
    )}
  </div>
);

const DraggableItem = ({ index, onMove, children }) => {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', String(index));
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const from = Number(e.dataTransfer.getData('text/plain'));
        onMove(from, index);
      }}
      className={`group rounded-lg border border-slate-200 dark:border-slate-800 p-3 mb-2 bg-white dark:bg-slate-900 transition ${dragging ? 'ring-2 ring-emerald-500' : ''}`}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-4 h-4 text-slate-400 mt-1" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const EditorPanel = ({ data, setData }) => {
  const update = (path, value) => {
    setData(prev => ({ ...prev, [path]: value }));
  };

  const moveItem = (key, from, to) => {
    setData(prev => {
      const list = [...prev[key]];
      const [moved] = list.splice(from, 1);
      list.splice(to, 0, moved);
      return { ...prev, [key]: list };
    });
  };

  const removeItem = (key, index) => {
    setData(prev => {
      const list = prev[key].filter((_, i) => i !== index);
      return { ...prev, [key]: list };
    });
  };

  const addItem = (key, item) => {
    setData(prev => ({ ...prev, [key]: [...prev[key], item] }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 max-h-[70vh] overflow-auto">
      <SectionHeader title="Personal Details" />
      <div className="grid grid-cols-2 gap-2">
        <input value={data.name} onChange={(e)=>update('name', e.target.value)} placeholder="Full name" className="input" />
        <input value={data.title} onChange={(e)=>update('title', e.target.value)} placeholder="Job title" className="input" />
        <input value={data.email} onChange={(e)=>update('email', e.target.value)} placeholder="Email" className="input" />
        <input value={data.phone} onChange={(e)=>update('phone', e.target.value)} placeholder="Phone" className="input" />
        <input value={data.location} onChange={(e)=>update('location', e.target.value)} placeholder="Location" className="input col-span-2" />
      </div>
      <div className="mt-3">
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <Upload className="w-4 h-4" /> Upload photo
          <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
            const file = e.target.files?.[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = () => setData(prev => ({...prev, photo: String(reader.result)}));
            reader.readAsDataURL(file);
          }} />
        </label>
      </div>

      <div className="mt-6">
        <SectionHeader title="Summary" />
        <textarea value={data.summary} onChange={(e)=>update('summary', e.target.value)} placeholder="Professional summary" className="input h-24" />
        <button
          onClick={async ()=>{
            try {
              const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai/suggest`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ context: { title: data.title, skills: data.skills.map(s=>s.name) }, type: 'summary' })});
              const json = await res.json();
              if(json?.text){ update('summary', json.text); }
            } catch(e){ /* ignore */ }
          }}
          className="mt-2 text-xs inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
        >
          <Type className="w-4 h-4" /> AI suggest
        </button>
      </div>

      <div className="mt-6">
        <SectionHeader title="Experience" onAdd={()=>addItem('experience', { role:'', company:'', period:'', bullets:[''] })} />
        {data.experience.map((exp, i)=> (
          <DraggableItem key={i} index={i} onMove={(from,to)=>moveItem('experience', from, to)}>
            <div className="grid grid-cols-2 gap-2">
              <input value={exp.role} onChange={(e)=>{
                const v=e.target.value; setData(prev=>{ const list=[...prev.experience]; list[i]={...list[i], role:v}; return {...prev, experience:list};});
              }} placeholder="Role" className="input" />
              <input value={exp.company} onChange={(e)=>{
                const v=e.target.value; setData(prev=>{ const list=[...prev.experience]; list[i]={...list[i], company:v}; return {...prev, experience:list};});
              }} placeholder="Company" className="input" />
              <input value={exp.period} onChange={(e)=>{
                const v=e.target.value; setData(prev=>{ const list=[...prev.experience]; list[i]={...list[i], period:v}; return {...prev, experience:list};});
              }} placeholder="Period" className="input col-span-2" />
            </div>
            <div className="mt-2 space-y-2">
              {exp.bullets.map((b, bi)=> (
                <div key={bi} className="flex items-center gap-2">
                  <input value={b} onChange={(e)=>{
                    const v=e.target.value; setData(prev=>{ const list=[...prev.experience]; const bullets=[...list[i].bullets]; bullets[bi]=v; list[i]={...list[i], bullets}; return {...prev, experience:list};});
                  }} placeholder="Achievement or responsibility" className="input flex-1" />
                  <button onClick={()=>{
                    setData(prev=>{ const list=[...prev.experience]; const bullets=list[i].bullets.filter((_,idx)=>idx!==bi); list[i]={...list[i], bullets}; return {...prev, experience:list};});
                  }} className="icon-btn" aria-label="Remove bullet">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button onClick={()=>{
                  setData(prev=>{ const list=[...prev.experience]; const bullets=[...list[i].bullets, '']; list[i]={...list[i], bullets}; return {...prev, experience:list};});
                }} className="text-xs text-emerald-600">Add bullet</button>
                <button onClick={async ()=>{
                  try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai/suggest`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ context: { role: exp.role, company: exp.company }, type: 'bullets' })});
                    const json = await res.json();
                    if(Array.isArray(json?.bullets)){
                      setData(prev=>{ const list=[...prev.experience]; list[i] = { ...list[i], bullets: json.bullets }; return { ...prev, experience: list };});
                    }
                  } catch(e){ /* ignore */ }
                }} className="text-xs text-emerald-600">AI suggest</button>
                <button onClick={()=>removeItem('experience', i)} className="text-xs text-rose-600">Remove</button>
              </div>
            </div>
          </DraggableItem>
        ))}
      </div>

      <div className="mt-6">
        <SectionHeader title="Education" onAdd={()=>addItem('education', { degree:'', school:'', period:'', details:'' })} />
        {data.education.map((ed, i)=> (
          <DraggableItem key={i} index={i} onMove={(from,to)=>moveItem('education', from, to)}>
            <div className="grid grid-cols-2 gap-2">
              <input value={ed.degree} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.education]; list[i]={...list[i], degree:v}; return {...prev, education:list};}); }} placeholder="Degree" className="input" />
              <input value={ed.school} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.education]; list[i]={...list[i], school:v}; return {...prev, education:list};}); }} placeholder="School" className="input" />
              <input value={ed.period} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.education]; list[i]={...list[i], period:v}; return {...prev, education:list};}); }} placeholder="Period" className="input col-span-2" />
              <input value={ed.details} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.education]; list[i]={...list[i], details:v}; return {...prev, education:list};}); }} placeholder="Details" className="input col-span-2" />
            </div>
            <div className="mt-2 flex gap-3">
              <button onClick={()=>removeItem('education', i)} className="text-xs text-rose-600">Remove</button>
            </div>
          </DraggableItem>
        ))}
      </div>

      <div className="mt-6">
        <SectionHeader title="Skills" onAdd={()=>addItem('skills', { name:'', level:'' })} />
        {data.skills.map((sk, i)=> (
          <DraggableItem key={i} index={i} onMove={(from,to)=>moveItem('skills', from, to)}>
            <div className="grid grid-cols-2 gap-2">
              <input value={sk.name} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.skills]; list[i]={...list[i], name:v}; return {...prev, skills:list};}); }} placeholder="Skill" className="input" />
              <input value={sk.level} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.skills]; list[i]={...list[i], level:v}; return {...prev, skills:list};}); }} placeholder="Proficiency (e.g., Advanced)" className="input" />
            </div>
            <div className="mt-2 flex gap-3">
              <button onClick={()=>removeItem('skills', i)} className="text-xs text-rose-600">Remove</button>
            </div>
          </DraggableItem>
        ))}
      </div>

      <div className="mt-6">
        <SectionHeader title="Achievements" onAdd={()=>addItem('achievements', '')} />
        {data.achievements.map((ac, i)=> (
          <DraggableItem key={i} index={i} onMove={(from,to)=>moveItem('achievements', from, to)}>
            <div className="flex items-center gap-2">
              <input value={ac} onChange={(e)=>{ const v=e.target.value; setData(prev=>{ const list=[...prev.achievements]; list[i]=v; return {...prev, achievements:list};}); }} placeholder="Achievement" className="input flex-1" />
              <button onClick={()=>removeItem('achievements', i)} className="icon-btn" aria-label="Remove achievement">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </DraggableItem>
        ))}
      </div>
    </div>
  );
};

export default EditorPanel;
