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
import { Modal } from "@/components/ui/modal";
import { Activity, Heart, Shield, Zap } from "lucide-react";

const Index = () => {
  const [selectedVital, setSelectedVital] = useState<{
    type: string;
    value: string;
    unit: string;
    status: string;
  } | null>(null);

  const [activeModal, setActiveModal] = useState<string | null>(null);

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
      <div className="h-[calc(100vh-4rem)] p-2 grid grid-cols-6 grid-rows-4 gap-2 overflow-hidden">
        {/* Row 1 */}
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('ambulance')} className="cursor-pointer h-full">
            <AmbulanceArrival />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('biometric')} className="cursor-pointer h-full">
            <BiometricScan />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('data')} className="cursor-pointer h-full">
            <DataTransmission />
          </div>
        </div>

        {/* Row 2 */}
        <div className="col-span-3 row-span-2">
          <RealTimeVitals onVitalClick={setSelectedVital} />
        </div>
        <div className="col-span-1 row-span-2">
          <div onClick={() => setActiveModal('stabilization')} className="cursor-pointer h-full">
            <PatientStabilization />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('livefeed')} className="cursor-pointer h-full">
            <LiveFeed />
          </div>
        </div>

        {/* Row 3 */}
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('hospital')} className="cursor-pointer h-full">
            <HospitalCoordination />
          </div>
        </div>

        {/* Row 4 */}
        <div className="col-span-1 row-span-1">
          <div onClick={() => setActiveModal('workflow')} className="cursor-pointer h-full">
            <WorkflowTimeline />
          </div>
        </div>
        <div className="col-span-2 row-span-1">
          <div onClick={() => setActiveModal('patient')} className="cursor-pointer h-full">
            <div className="medical-card h-full p-2">
              <h3 className="text-xs font-medium mb-2 text-card-foreground">Patient Info</h3>
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
        </div>
        <div className="col-span-3 row-span-1">
          <div onClick={() => setActiveModal('timeline')} className="cursor-pointer h-full">
            <TimelineEvents />
          </div>
        </div>
      </div>

      {/* Vital Signs Modal */}
      {selectedVital && (
        <VitalSignsModal
          vital={selectedVital}
          onClose={() => setSelectedVital(null)}
        />
      )}

      {/* Component Deep Dive Modals */}
      <Modal isOpen={activeModal === 'ambulance'} onClose={() => setActiveModal(null)} title="Ambulance Arrival Details" size="lg">
        <AmbulanceArrival />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Route Optimization</h4>
          <p className="text-sm text-muted-foreground">AI-powered routing considering traffic, road conditions, and hospital capacity. Current route efficiency: 94%</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'biometric'} onClose={() => setActiveModal(null)} title="Biometric Verification System" size="lg">
        <BiometricScan />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Security Analysis</h4>
          <p className="text-sm text-muted-foreground">Multi-factor biometric authentication using facial recognition, fingerprint, and retinal scanning for patient identification.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'data'} onClose={() => setActiveModal(null)} title="Data Transmission Hub" size="lg">
        <DataTransmission />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Network Details</h4>
          <p className="text-sm text-muted-foreground">Encrypted real-time data transmission to hospital networks using 5G+ connectivity with automatic failover systems.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'stabilization'} onClose={() => setActiveModal(null)} title="Patient Stabilization Protocol" size="lg">
        <PatientStabilization />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Treatment Protocol</h4>
          <p className="text-sm text-muted-foreground">AI-guided treatment protocols based on patient vitals, medical history, and current condition assessment.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'livefeed'} onClose={() => setActiveModal(null)} title="Live Video Communication" size="xl">
        <LiveFeed />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Communication Bridge</h4>
          <p className="text-sm text-muted-foreground">Real-time video conferencing between ambulance crew and hospital specialists with patient monitoring overlay.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'hospital'} onClose={() => setActiveModal(null)} title="Hospital Coordination Network" size="lg">
        <HospitalCoordination />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Network Status</h4>
          <p className="text-sm text-muted-foreground">Connected to regional hospital network with real-time bed availability, specialist status, and resource allocation.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'workflow'} onClose={() => setActiveModal(null)} title="Emergency Response Workflow" size="lg">
        <WorkflowTimeline />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Protocol Management</h4>
          <p className="text-sm text-muted-foreground">Automated workflow management ensuring all emergency protocols are followed according to medical guidelines.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'timeline'} onClose={() => setActiveModal(null)} title="Event Timeline Analysis" size="xl">
        <TimelineEvents />
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium mb-2">Event Tracking</h4>
          <p className="text-sm text-muted-foreground">Comprehensive timeline tracking all emergency response events for quality assurance and legal documentation.</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'patient'} onClose={() => setActiveModal(null)} title="Patient Information System" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Personal Information</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Name:</span><span>John Mitchell</span></div>
                <div className="flex justify-between"><span>Age:</span><span>42 years</span></div>
                <div className="flex justify-between"><span>Gender:</span><span>Male</span></div>
                <div className="flex justify-between"><span>Blood Type:</span><span>O-</span></div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Medical History</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Allergies:</span><span>Penicillin</span></div>
                <div className="flex justify-between"><span>Conditions:</span><span>Hypertension</span></div>
                <div className="flex justify-between"><span>Medications:</span><span>Lisinopril</span></div>
                <div className="flex justify-between"><span>Emergency Contact:</span><span>Sarah Mitchell</span></div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;