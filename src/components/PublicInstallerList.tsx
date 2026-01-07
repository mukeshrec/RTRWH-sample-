import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export function PublicInstallerList() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('installer_profiles').select('*');
      if (data) setCompanies(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((c) => (
        <div key={c.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center gap-2 mb-6 text-emerald-500 bg-emerald-50 w-fit px-3 py-1 rounded-full">
            <ShieldCheck size={14} /> <span className="text-[10px] font-black uppercase">Verified Partner</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-8">{c.company_name}</h3>
          <a 
            href={c.website_url} 
            target="_blank" 
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Visit Website <ExternalLink size={16} />
          </a>
        </div>
      ))}
    </div>
  );
}