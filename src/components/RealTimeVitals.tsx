import { useState, useEffect } from "react";
import { Heart, Activity, ThermometerSun, Droplets, Zap, TrendingUp } from "lucide-react";

interface VitalSignsProps {
  onVitalClick: (vital: { type: string; value: string; unit: string; status: string }) => void;
}

export const RealTimeVitals = ({ onVitalClick }: VitalSignsProps) => {
  const [vitals, setVitals] = useState({
    heartRate: { value: 72, status: 'normal' },
    bloodPressure: { systolic: 118, diastolic: 78, status: 'normal' },
    temperature: { value: 98.6, status: 'normal' },
    oxygen: { value: 98, status: 'normal' },
    respiratory: { value: 16, status: 'normal' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: {
          value: Math.max(60, Math.min(100, prev.heartRate.value + (Math.random() - 0.5) * 4)),
          status: prev.heartRate.value > 90 ? 'warning' : prev.heartRate.value > 100 ? 'critical' : 'normal'
        },
        bloodPressure: {
          systolic: Math.max(100, Math.min(140, prev.bloodPressure.systolic + (Math.random() - 0.5) * 6)),
          diastolic: Math.max(60, Math.min(90, prev.bloodPressure.diastolic + (Math.random() - 0.5) * 4)),
          status: prev.bloodPressure.systolic > 130 ? 'warning' : 'normal'
        },
        temperature: {
          value: Math.max(96, Math.min(102, prev.temperature.value + (Math.random() - 0.5) * 0.2)),
          status: prev.temperature.value > 100.4 ? 'warning' : prev.temperature.value > 102 ? 'critical' : 'normal'
        },
        oxygen: {
          value: Math.max(92, Math.min(100, prev.oxygen.value + (Math.random() - 0.5) * 2)),
          status: prev.oxygen.value < 95 ? 'warning' : prev.oxygen.value < 90 ? 'critical' : 'normal'
        },
        respiratory: {
          value: Math.max(12, Math.min(24, prev.respiratory.value + (Math.random() - 0.5) * 2)),
          status: prev.respiratory.value > 20 ? 'warning' : 'normal'
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive/90 border-destructive/30 bg-destructive/5';
      case 'warning': return 'text-warning/90 border-warning/30 bg-warning/5';
      default: return 'text-success/90 border-success/30 bg-success/5';
    }
  };

  const handleVitalClick = (type: string, value: string, unit: string, status: string) => {
    onVitalClick({ type, value, unit, status });
  };

  return (
    <div className="medical-card h-full p-2">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-4 h-4 text-primary animate-pulse-vital" />
        <h3 className="text-xs font-medium text-card-foreground">Real-Time Vitals</h3>
        <div className="ml-auto flex items-center gap-1 text-xs text-success">
          <div className="w-1 h-1 bg-success rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1 h-[calc(100%-2rem)]">
        {/* Heart Rate */}
        <div 
          className={`vital-display p-1 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getStatusColor(vitals.heartRate.status)}`}
          onClick={() => handleVitalClick('Heart Rate', Math.round(vitals.heartRate.value).toString(), 'BPM', vitals.heartRate.status)}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Heart className="w-2 h-2 animate-pulse-vital" />
            <span className="text-xs font-medium">HR</span>
          </div>
          <div className="text-sm font-bold mb-0.5">
            {Math.round(vitals.heartRate.value)} <span className="text-xs font-normal">BPM</span>
          </div>
          <div className="ecg-line opacity-60 h-2"></div>
        </div>

        {/* Blood Pressure */}
        <div 
          className={`vital-display p-1 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getStatusColor(vitals.bloodPressure.status)}`}
          onClick={() => handleVitalClick('Blood Pressure', `${Math.round(vitals.bloodPressure.systolic)}/${Math.round(vitals.bloodPressure.diastolic)}`, 'mmHg', vitals.bloodPressure.status)}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Activity className="w-2 h-2" />
            <span className="text-xs font-medium">BP</span>
          </div>
          <div className="text-sm font-bold mb-0.5">
            {Math.round(vitals.bloodPressure.systolic)}/{Math.round(vitals.bloodPressure.diastolic)} 
            <span className="text-xs font-normal ml-1">mmHg</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>Stable</span>
          </div>
        </div>

        {/* Temperature */}
        <div 
          className={`vital-display p-1 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getStatusColor(vitals.temperature.status)}`}
          onClick={() => handleVitalClick('Temperature', vitals.temperature.value.toFixed(1), '°F', vitals.temperature.status)}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <ThermometerSun className="w-2 h-2" />
            <span className="text-xs font-medium">Temp</span>
          </div>
          <div className="text-sm font-bold mb-0.5">
            {vitals.temperature.value.toFixed(1)} <span className="text-xs font-normal">°F</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className={`w-1 h-1 rounded-full ${vitals.temperature.value > 99 ? 'bg-warning' : 'bg-current'}`}></div>
            <span>Core</span>
          </div>
        </div>

        {/* Oxygen Saturation */}
        <div 
          className={`vital-display p-1 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getStatusColor(vitals.oxygen.status)}`}
          onClick={() => handleVitalClick('Oxygen', Math.round(vitals.oxygen.value).toString(), '%', vitals.oxygen.status)}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Droplets className="w-2 h-2" />
            <span className="text-xs font-medium">SpO₂</span>
          </div>
          <div className="text-sm font-bold mb-0.5">
            {Math.round(vitals.oxygen.value)} <span className="text-xs font-normal">%</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
            <span>Sat</span>
          </div>
        </div>

        {/* Respiratory Rate */}
        <div 
          className={`vital-display p-1 rounded-lg border cursor-pointer col-span-2 transition-all hover:scale-[1.02] ${getStatusColor(vitals.respiratory.status)}`}
          onClick={() => handleVitalClick('Respiratory Rate', Math.round(vitals.respiratory.value).toString(), '/min', vitals.respiratory.status)}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <Zap className="w-2 h-2" />
            <span className="text-xs font-medium">Respiratory Rate</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold">
              {Math.round(vitals.respiratory.value)} <span className="text-xs font-normal">/min</span>
            </div>
            <div className="text-xs text-right">
              <div>Regular</div>
              <div className="text-muted-foreground">Normal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};