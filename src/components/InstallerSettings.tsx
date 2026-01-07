import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Assuming your client is here
import { Building2, Globe, CheckCircle, AlertCircle } from 'lucide-react';

export default function InstallerSettings({ session }: { session: any }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ company: '', site: '' });
  const [msg, setMsg] = useState('');

  // Fetch existing data on load
  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase
        .from('installer_profiles')
        .select('*')
        .single();
      if (data) setProfile({ company: data.company_name, site: data.website_url });
    }
    getProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.from('installer_profiles').upsert({
      id: session.user.id,
      company_name: profile.company,
      website_url: profile.site,
      contact_email: session.user.email,
    });

    setMsg(error ? "Error updating profile" : "Profile synced successfully!");
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Business Console</h2>
        <p className="text-slate-500 mb-8 font-medium">Manage how your company appears to Varun customers.</p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal Company Name</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 focus-within:ring-2 ring-blue-500 transition-all">
              <Building2 size={20} className="text-slate-400" />
              <input 
                value={profile.company}
                onChange={(e) => setProfile({...profile, company: e.target.value})}
                className="bg-transparent w-full p-4 outline-none text-slate-700 font-semibold"
                placeholder="e.g. Varun Engineering Works"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Website</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 focus-within:ring-2 ring-blue-500 transition-all">
              <Globe size={20} className="text-slate-400" />
              <input 
                value={profile.site}
                onChange={(e) => setProfile({...profile, site: e.target.value})}
                className="bg-transparent w-full p-4 outline-none text-slate-700 font-semibold"
                placeholder="https://www.varun-rwh.com"
              />
            </div>
          </div>

          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3"
          >
            {loading ? 'Processing...' : 'Sync to Directory'}
          </button>

          {msg && (
            <div className={`mt-4 p-4 rounded-xl flex items-center gap-2 text-sm font-bold ${msg.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {msg.includes('Error') ? <AlertCircle size={18}/> : <CheckCircle size={18}/>} {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}