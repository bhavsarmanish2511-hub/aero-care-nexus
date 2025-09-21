import { useState } from "react";
import { AmbulanceArrival } from "@/components/AmbulanceArrival";
import { BiometricScan } from "@/components/BiometricScan";
import { RealTimeVitals } from "@/components/RealTimeVitals";
import { PatientStabilization } from "@/components/PatientStabilization";
import { LiveFeed } from "@/components/LiveFeed";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { DataTransmission } from "@/components/DataTransmission";
import { HospitalCoordination } from "@/components/HospitalCoordination";
import { TimelineEvents } from "@/components/TimelineEvents";
import { VitalSignsModal } from "@/components/VitalSignsModal";
import { Activity, Heart, Shield, Zap } from "lucide-react";

const Index = () => {
  const [selectedVital, setSelectedVital] = useState<{
    type: string;
    value: string;
    unit: string;
    status: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Fixed Header */}
      <header className="h-16 bg-card/90 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 relative z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center animate-glow-pulse">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AirRescue 2035
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4 text-accent animate-pulse-vital" />
            <span>Emergency Response Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span>Emergency Protocol</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Zap className="w-4 h-4 text-warning" />
            <span>Priority 1</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="h-[calc(100vh-4rem)] p-4 grid grid-cols-6 grid-rows-4 gap-3 overflow-hidden">
        {/* Row 1 */}
        <div className="col-span-2 row-span-1">
          <AmbulanceArrival />
        </div>
        <div className="col-span-2 row-span-1">
          <BiometricScan />
        </div>
        <div className="col-span-2 row-span-1">
          <DataTransmission />
        </div>

        {/* Row 2 */}
        <div className="col-span-3 row-span-2">
          <RealTimeVitals onVitalClick={setSelectedVital} />
        </div>
        <div className="col-span-1 row-span-2">
          <PatientStabilization />
        </div>
        <div className="col-span-2 row-span-1">
          <LiveFeed />
        </div>

        {/* Row 3 */}
        <div className="col-span-2 row-span-1">
          <HospitalCoordination />
        </div>

        {/* Row 4 */}
        <div className="col-span-1 row-span-1">
          <WorkflowTimeline />
        </div>
        <div className="col-span-2 row-span-1">
          <div className="medical-card h-full p-3">
            <h3 className="text-sm font-medium mb-2 text-card-foreground">Patient Info</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>42 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span>Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="text-primary">MED-2035-7842</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 row-span-1">
          <TimelineEvents />
        </div>
      </div>

      {/* Vital Signs Modal */}
      {selectedVital && (
        <VitalSignsModal
          vital={selectedVital}
          onClose={() => setSelectedVital(null)}
        />
      )}
    </div>
  );
};

export default Index;