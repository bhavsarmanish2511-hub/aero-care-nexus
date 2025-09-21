import { useState, useEffect } from "react";
import { Video, Mic, MicOff, VideoOff, Maximize2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveFeed = () => {
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [feeds, setFeeds] = useState([
    { id: 1, name: "Ambulance Cam", status: "active", quality: "HD" },
    { id: 2, name: "Patient Monitor", status: "active", quality: "4K" },
    { id: 3, name: "External View", status: "inactive", quality: "SD" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeeds(prev => prev.map(feed => ({
        ...feed,
        status: Math.random() > 0.1 ? "active" : "inactive"
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="medical-card h-full p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-card-foreground">Live Feed</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          <span className="text-xs text-destructive font-medium">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-3 h-[calc(100%-3rem)]">
        {/* Main Video Feed */}
        <div className="relative bg-muted/20 rounded-lg h-24 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary/60" />
          </div>
          
          {/* Video quality indicator */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-background/80 rounded text-xs font-medium">
            HD LIVE
          </div>
          
          {/* Recording indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            <span className="text-xs text-destructive">REC</span>
          </div>
          
          {/* Control overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 w-6 p-0 bg-background/80"
                onClick={() => setIsVideoActive(!isVideoActive)}
              >
                {isVideoActive ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 w-6 p-0 bg-background/80"
                onClick={() => setIsAudioActive(!isAudioActive)}
              >
                {isAudioActive ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
              </Button>
            </div>
            <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-background/80">
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>
          
          {/* Animated scan lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-0.5 bg-accent/30 absolute animate-scan-line"></div>
          </div>
        </div>
        
        {/* Feed Status List */}
        <div className="space-y-2">
          {feeds.map((feed) => (
            <div key={feed.id} className="flex items-center justify-between p-2 bg-muted/10 rounded">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${feed.status === 'active' ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                <span className="text-xs font-medium">{feed.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{feed.quality}</span>
                <div className={`px-1.5 py-0.5 rounded text-xs ${feed.status === 'active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {feed.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};