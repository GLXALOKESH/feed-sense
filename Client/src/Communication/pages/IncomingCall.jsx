import { useState } from "react";
import { Phone, PhoneOff, Bot } from "lucide-react";

// Mock UI components for stand-alone functionality
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Avatar = ({ children, className }) => <div className={`relative rounded-full flex items-center justify-center ${className}`}>{children}</div>;
const AvatarFallback = ({ children, className }) => <div className={className}>{children}</div>;

// Mock for react-router-dom's useNavigate
const useNavigate = () => {
    return (path: string): void => console.log(`Navigating to: ${path}`);
};

export default function IncomingCall(): JSX.Element {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const handleAccept = (): void => {
    setIsAnimating(false);
    // Navigate to active call after brief delay
    setTimeout(() => {
      navigate('/call/active');
    }, 500);
  };

  const handleReject = (): void => {
    navigate('/dashboard');
  };

  const getVariantClass = (variant: 'endCall' | 'call', size: 'icon'): string => {
    let classes = 'font-semibold rounded-full transition-colors flex items-center justify-center ';
    if (size === 'icon') {
        classes += ' w-16 h-16 ';
    }
    
    switch (variant) {
        case 'endCall':
            classes += 'bg-red-600 text-white hover:bg-red-700';
            break;
        case 'call':
            classes += 'bg-green-500 text-white hover:bg-green-600';
            break;
        default:
            classes += 'bg-gray-500 text-white hover:bg-gray-600';
    }
    return classes;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse blur-2xl" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
        {/* AI Avatar */}
        <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
          <Avatar className="w-32 h-32 shadow-lg shadow-purple-500/30">
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-700 text-6xl">
              <Bot className="w-16 h-16 text-white" />
            </AvatarFallback>
          </Avatar>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Call Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">AI Assistant</h1>
          <p className="text-xl text-gray-300">is calling you...</p>
          <p className="text-sm text-gray-400">Scheduled AI consultation</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 pt-8">
          <Button
            className={getVariantClass("endCall", "icon")}
            onClick={handleReject}
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          <Button
            className={getVariantClass("call", "icon")}
            onClick={handleAccept}
          >
            <Phone className="w-8 h-8" />
          </Button>
        </div>

        {/* Status Text */}
        <p className="text-sm text-gray-500 pt-4">
          Swipe up to view call details
        </p>
      </div>

      {/* Wave animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-purple-900/10 to-transparent">
      </div>
    </div>
  );
}
