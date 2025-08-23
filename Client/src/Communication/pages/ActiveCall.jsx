import { useState, useEffect } from "react";
import { Bot, Mic, MicOff, PhoneOff } from "lucide-react";

// Mock components for stand-alone functionality
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Avatar = ({ children, className }) => <div className={`relative rounded-full flex items-center justify-center ${className}`}>{children}</div>;
const AvatarFallback = ({ children, className }) => <div className={className}>{children}</div>;
const ScrollArea = ({ children, className }) => <div className={`overflow-y-auto ${className}`}>{children}</div>;

// Mock for react-router-dom's useNavigate
const useNavigate = () => {
    return (path) => console.log(`Navigating to: ${path}`);
};

// Interface for the transcript message structure
interface TranscriptMessage {
  id: string;
  speaker: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function ActiveCall() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAISpeaking, setIsAISpeaking] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([
    {
      id: '1',
      speaker: 'ai',
      text: 'Hello! Thank you for taking my call. How are you doing today?',
      timestamp: '00:01'
    },
    {
      id: '2',
      speaker: 'user',
      text: 'Hi there! I\'m doing well, thanks for asking.',
      timestamp: '00:05'
    },
    {
      id: '3',
      speaker: 'ai',
      text: 'That\'s wonderful to hear. I\'m calling to discuss your recent inquiry about our AI assistant services. Do you have a few minutes to chat?',
      timestamp: '00:08'
    }
  ]);

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate AI speaking animation
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      setIsAISpeaking(prev => !prev);
    }, 2000);

    return () => clearInterval(speakingInterval);
  }, []);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = (): void => {
    navigate('/call/summary');
  };

  const toggleMute = (): void => {
    setIsMuted(!isMuted);
  };

  const getVariantClass = (variant, size) => {
    let classes = 'font-semibold rounded-lg transition-colors ';
    if (size === 'icon') {
      classes += ' p-2 ';
    } else {
      classes += ' px-4 py-2 ';
    }
    switch (variant) {
      case 'destructive':
        classes += 'bg-red-500 text-white hover:bg-red-600';
        break;
      case 'secondary':
        classes += 'bg-gray-200 text-gray-800 hover:bg-gray-300';
        break;
      case 'endCall':
        classes += 'bg-red-600 text-white hover:bg-red-700';
        break;
      default:
        classes += 'bg-blue-500 text-white hover:bg-blue-600';
    }
    return classes;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 text-center border-b border-white/20">
        <p className="text-sm text-gray-400">Call Duration</p>
        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">{formatDuration(callDuration)}</p>
      </div>

      {/* AI Avatar Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-8 space-y-6">
        <div className={`relative transition-all duration-300 ${isAISpeaking ? 'scale-110' : 'scale-100'}`}>
          <Avatar className={`w-40 h-40 transition-all duration-300 shadow-lg ${isAISpeaking ? 'shadow-purple-500/50' : 'shadow-indigo-500/50'}`}>
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-700 text-6xl">
              <Bot className="w-20 h-20 text-white" />
            </AvatarFallback>
          </Avatar>
          
          {/* Speaking indicator */}
          {isAISpeaking && (
            <div className="absolute inset-0 rounded-full border-4 border-purple-400/50 animate-ping"></div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
          <p className="text-gray-400">
            {isAISpeaking ? 'Speaking...' : 'Listening...'}
          </p>
        </div>
      </div>

      {/* Live Transcript */}
      <div className="relative z-10 flex-1 mx-4 sm:mx-6 mb-6">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 h-full flex flex-col">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex-shrink-0">Live Transcript</h3>
          <ScrollArea className="flex-grow h-full pr-2">
            <div className="space-y-3">
              {transcript.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.speaker === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="relative z-10 p-6 flex justify-center items-center gap-8 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <Button
          className={getVariantClass(isMuted ? "destructive" : "secondary", "icon") + " w-14 h-14 rounded-full"}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        <Button
          className={getVariantClass("endCall", "icon") + " w-16 h-16 rounded-full"}
          onClick={handleEndCall}
        >
          <PhoneOff className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
