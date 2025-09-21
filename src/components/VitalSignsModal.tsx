import { useEffect, useState } from "react";
import { X, Activity, Heart, ThermometerSun, Droplets, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VitalSignsModalProps {
  vital: {
    type: string;
    value: string;
    unit: string;
    status: string;
  };
  onClose: () => void;
}

export const VitalSignsModal = ({ vital, onClose }: VitalSignsModalProps) => {
  const [ecgData, setEcgData] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Generate ECG-like data
    const generateECGData = () => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        const base = Math.sin(i * 0.1) * 10;
        const spike = i % 25 === 0 ? Math.random() * 50 : 0;
        data.push(50 + base + spike);
      }
      return data;
    };
    
    setEcgData(generateECGData());
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 100);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const getVitalIcon = () => {
    switch (vital.type.toLowerCase()) {
      case 'heart rate':
        return <Heart className="w-6 h-6 text-destructive animate-pulse-vital" />;
      case 'blood pressure':
        return <Activity className="w-6 h-6 text-primary" />;
      case 'temperature':
        return <ThermometerSun className="w-6 h-6 text-warning" />;
      case 'oxygen':
        return <Droplets className="w-6 h-6 text-accent" />;
      default:
        return <Zap className="w-6 h-6 text-secondary" />;
    }
  };
  
  const getStatusColor = () => {
    switch (vital.status) {
      case 'critical':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      case 'normal':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="medical-card w-[600px] p-6 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {getVitalIcon()}
            <div>
              <h2 className="text-xl font-semibold">{vital.type} Details</h2>
              <p className="text-sm text-muted-foreground">Real-time monitoring</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Current Value */}
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <div className="text-3xl font-bold mb-1">
              <span className={getStatusColor()}>{vital.value}</span>
              <span className="text-lg text-muted-foreground ml-1">{vital.unit}</span>
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {vital.status.toUpperCase()}
            </div>
          </div>
          
          {/* ECG Wave Visualization */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-card-foreground">Waveform Analysis</h3>
            <div className="h-32 bg-muted/10 rounded-lg relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--accent) / 0.1)" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${100 - ecgData[0]} ${ecgData.map((point, index) => `L ${index} ${100 - point}`).join(' ')}`}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                  className="drop-shadow-sm"
                />
                <path
                  d={`M 0 ${100 - ecgData[0]} ${ecgData.map((point, index) => `L ${index} ${100 - point}`).join(' ')} L 100 100 L 0 100 Z`}
                  fill="url(#ecgGradient)"
                  opacity="0.3"
                />
                {/* Moving indicator */}
                <line
                  x1={currentIndex}
                  y1="0"
                  x2={currentIndex}
                  y2="100"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  opacity="0.8"
                  className="animate-pulse"
                />
              </svg>
              <div className="absolute top-2 right-2 text-xs text-accent font-mono">
                {vital.type === 'Heart Rate' ? '72 BPM' : 'LIVE'}
              </div>
            </div>
          </div>
          
          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-semibold text-success">Avg</div>
              <div className="text-sm text-muted-foreground">
                {vital.type === 'Heart Rate' ? '74 BPM' : 
                 vital.type === 'Blood Pressure' ? '118/78' :
                 vital.type === 'Temperature' ? '98.7°F' : '98%'}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-semibold text-warning">Peak</div>
              <div className="text-sm text-muted-foreground">
                {vital.type === 'Heart Rate' ? '89 BPM' : 
                 vital.type === 'Blood Pressure' ? '125/82' :
                 vital.type === 'Temperature' ? '99.1°F' : '100%'}
              </div>
            </div>
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-semibold text-primary">Trend</div>
              <div className="text-sm text-success">↗ Stable</div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-card-foreground">AI Recommendations</h3>
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-accent">
                {vital.status === 'critical' ? 
                  `${vital.type} requires immediate attention. Consider emergency intervention.` :
                  vital.status === 'warning' ?
                  `${vital.type} shows irregular patterns. Continue monitoring closely.` :
                  `${vital.type} within normal parameters. Maintain current treatment protocol.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};