import { useState, useEffect } from "react";
import { Video, Mic, MicOff, VideoOff, Maximize2, Camera, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveFeed = () => {
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [activeCall, setActiveCall] = useState(true);
  const [participants, setParticipants] = useState([
    { id: 1, name: "Dr. Sarah Chen", role: "Ambulance Medic", status: "connected", avatar: "SC" },
    { id: 2, name: "Dr. Michael Torres", role: "ER Physician", status: "connected", avatar: "MT" },
    { id: 3, name: "Nurse Jennifer Kim", role: "Trauma Specialist", status: "connecting", avatar: "JK" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(participant => ({
        ...participant,
        status: participant.status === "connecting" && Math.random() > 0.7 ? "connected" : participant.status
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="medical-card h-full p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary animate-pulse-vital" />
          <h3 className="text-xs font-medium text-card-foreground">Doctor Communication</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          <span className="text-xs text-destructive font-medium">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-2 h-[calc(100%-2rem)]">
        {/* Main Video Conference */}
        <div className="relative bg-muted/20 rounded-lg h-20 overflow-hidden group">
          <div className="grid grid-cols-2 h-full gap-1">
            {/* Ambulance Doctor Feed */}
            <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center rounded">
              <div className="text-center">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs font-bold text-primary">SC</span>
                </div>
                <div className="text-xs font-medium">Dr. Chen</div>
                <div className="text-xs text-muted-foreground">Ambulance</div>
              </div>
              
              {/* Video indicator */}
              <div className="absolute top-1 right-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Hospital Doctor Feed */}
            <div className="relative bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center rounded">
              <div className="text-center">
                <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs font-bold text-secondary">MT</span>
                </div>
                <div className="text-xs font-medium">Dr. Torres</div>
                <div className="text-xs text-muted-foreground">ER</div>
              </div>
              
              {/* Video indicator */}
              <div className="absolute top-1 right-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Patient Vitals Overlay */}
          <div className="absolute bottom-1 left-1 right-1 bg-background/80 rounded text-xs p-1">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div><span className="text-destructive">HR:</span> 72</div>
              <div><span className="text-warning">BP:</span> 118/78</div>
              <div><span className="text-success">SpO2:</span> 98%</div>
            </div>
          </div>
          
          {/* Control overlay */}
          <div className="absolute top-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-5 w-5 p-0 bg-background/80"
              onClick={() => setIsVideoActive(!isVideoActive)}
            >
              {isVideoActive ? <Video className="w-2.5 h-2.5" /> : <VideoOff className="w-2.5 h-2.5" />}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-5 w-5 p-0 bg-background/80"
              onClick={() => setIsAudioActive(!isAudioActive)}
            >
              {isAudioActive ? <Mic className="w-2.5 h-2.5" /> : <MicOff className="w-2.5 h-2.5" />}
            </Button>
          </div>
        </div>
        
        {/* Participants List */}
        <div className="space-y-1">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between p-1.5 bg-muted/10 rounded text-xs">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${participant.status === 'connected' ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
                <span className="font-medium">{participant.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">{participant.role}</span>
                <Button size="sm" variant="ghost" className="h-4 w-4 p-0">
                  <Phone className="w-2.5 h-2.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call Controls */}
        <div className="flex justify-center gap-2">
          <Button 
            size="sm" 
            variant={activeCall ? "destructive" : "default"} 
            className="text-xs px-3 py-1"
            onClick={() => setActiveCall(!activeCall)}
          >
            {activeCall ? "End Call" : "Start Call"}
          </Button>
        </div>
      </div>
    </div>
  );
};