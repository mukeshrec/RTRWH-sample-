import { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue, off } from 'firebase/database';
import { 
  Droplets, 
  CloudRain, 
  LineChart, 
  Trophy, 
  Activity, 
  Wifi, 
  RefreshCw,
  Zap
} from 'lucide-react';

export default function IotDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const DB_PATH = 'iot/pit001';

  useEffect(() => {
    const dataRef = ref(database, DB_PATH);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats(data);
        setIsConnected(true);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    });
    return () => off(dataRef);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const isNormal = status?.toLowerCase() === 'normal';
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
        isNormal ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {status || 'Pending'}
      </span>
    );
  };

  const KPICard = ({ title, value, unit, icon: Icon, description, trend }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Icon size={24} />
        </div>
        {trend && (
          <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">
            <Zap size={12} /> {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <h3 className="text-2xl font-bold text-slate-900">{value ?? '--'}</h3>
          <span className="text-slate-400 text-sm font-semibold">{unit}</span>
        </div>
        <p className="text-slate-400 text-xs mt-2">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Top Professional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Droplets size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">VARUN <span className="text-blue-600">Pro</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">IoT Infrastructure</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className={isConnected ? 'text-emerald-500' : 'text-slate-300'}>
                  {isConnected ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                </span>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>
              <p className="text-[10px] text-slate-400 uppercase">Last Sync: {lastUpdated || 'Never'}</p>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
              <RefreshCw size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
               <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">MV</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Dashboard Title Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800">RTRWH Assessment Dashboard</h2>
          <p className="text-slate-500">Real-time monitoring for Pit ID: <span className="font-mono text-blue-600 font-bold">PIT-001</span></p>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
            title="Ultrasonic Level" 
            value={stats?.ultrasonic_cm} 
            unit="cm" 
            icon={Activity}
            description="Tank depth clearance"
            trend="+2.4%"
          />
          <KPICard 
            title="Rain Intensity" 
            value={stats?.rain_adc} 
            unit="ADC" 
            icon={CloudRain}
            description="Sensor raw frequency"
          />
          <KPICard 
            title="Today's Harvest" 
            value={stats?.water_saved_today} 
            unit="Liters" 
            icon={Droplets}
            description="Daily cumulative"
          />
          <KPICard 
            title="Efficiency Badge" 
            value={stats?.badge} 
            icon={Trophy}
            description="System achievement"
          />
        </div>

        {/* Secondary Detailed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Status Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Wifi size={18} className="text-blue-500" /> Device Diagnostics
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">System Status</span>
                <StatusBadge status={stats?.pit_status} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Hardware ID</span>
                <span className="text-sm font-mono font-bold text-slate-700">ESP32-RTRWH-V1</span>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-xs text-slate-400 mb-3">TOTAL AGGREGATE SAVINGS</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-600">
                    {stats?.total_water_saved ? Number(stats.total_water_saved).toFixed(1) : '--'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">Liters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for Analytics Graph */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden text-white">
            <div className="relative z-10">
              <h4 className="font-bold mb-1 flex items-center gap-2 text-blue-400">
                <LineChart size={18} /> Live Telemetry
              </h4>
              <p className="text-slate-400 text-xs mb-8 font-medium">Visualization of harvest efficiency over 24h</p>
              
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">Chart Rendering Engine Ready</p>
              </div>
            </div>
            {/* Visual Flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
          </div>
        </div>
      </main>
    </div>
  );
}