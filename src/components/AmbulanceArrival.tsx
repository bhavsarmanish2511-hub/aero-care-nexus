import { useState, useEffect } from "react";
import { Truck, MapPin, Clock, Navigation } from "lucide-react";

export const AmbulanceArrival = () => {
  const [eta, setEta] = useState(145);
  const [distance, setDistance] = useState(2.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
      setDistance(prev => Math.max(0, prev - 0.01));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="w-5 h-5 text-primary animate-glow-pulse" />
        <h3 className="text-sm font-medium text-card-foreground">Ambulance Arrival</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-xs text-muted-foreground">ETA</span>
          </div>
          <span className="text-lg font-bold text-warning font-mono">
            {formatTime(eta)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">Distance</span>
          </div>
          <span className="text-sm font-semibold text-accent">
            {distance.toFixed(2)} km
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Location</span>
          </div>
          <span className="text-xs text-card-foreground">Downtown Medical</span>
        </div>
        
        {/* Status indicator */}
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-xs text-warning font-medium">En Route - Priority 1</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-medical h-2 mt-2">
          <div 
            className="progress-fill h-full"
            style={{ 
              animationDelay: '0s',
              width: `${Math.max(0, 100 - (eta / 145) * 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};