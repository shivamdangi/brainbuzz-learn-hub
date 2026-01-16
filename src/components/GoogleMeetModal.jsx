import { Video, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export const GoogleMeetModal = ({ isOpen, onClose, meetUrl, announcementTitle }) => {
  const [copied, setCopied] = useState(false);

  const handleJoinClass = () => {
    if (meetUrl) {
      window.open(meetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = async () => {
    if (meetUrl) {
      try {
        await navigator.clipboard.writeText(meetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Join Class Session
          </DialogTitle>
          <DialogDescription>
            {announcementTitle || "Google Meet session"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Meet URL Display */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Meeting Link</span>
            </div>
            <div className="text-sm text-gray-600 break-all font-mono bg-white p-2 rounded border">
              {meetUrl || "No meeting URL provided"}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleJoinClass}
              disabled={!meetUrl}
              className="w-full"
              size="lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Class in New Tab
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCopyLink}
              disabled={!meetUrl}
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Meeting Link
                </>
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-xs text-gray-500 text-center">
            Click "Join Class" to open the meeting in a new browser tab
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
