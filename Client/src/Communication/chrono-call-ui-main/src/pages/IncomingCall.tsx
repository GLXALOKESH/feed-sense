import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, PhoneOff, Bot } from "lucide-react"

export default function IncomingCall() {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(true)

  const handleAccept = () => {
    setIsAnimating(false)
    // Navigate to active call after brief delay
    setTimeout(() => {
      navigate('/call/active')
    }, 500)
  }

  const handleReject = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen gradient-card flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full gradient-electric animate-pulse blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full gradient-primary animate-pulse blur-2xl animation-delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* AI Avatar */}
        <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
          <Avatar className="w-32 h-32 glow-accent">
            <AvatarFallback className="gradient-electric text-6xl">
              <Bot className="w-16 h-16 text-accent-foreground" />
            </AvatarFallback>
          </Avatar>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping animation-delay-500"></div>
        </div>

        {/* Call Info */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">AI Assistant</h1>
          <p className="text-xl text-muted-foreground">is calling you...</p>
          <p className="text-sm text-muted-foreground">Scheduled AI consultation</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-8 mt-12">
          {/* Reject Button */}
          <Button
            variant="endCall"
            size="icon"
            className="w-16 h-16 rounded-full"
            onClick={handleReject}
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          {/* Accept Button */}
          <Button
            variant="call"
            size="icon"
            className="w-16 h-16 rounded-full"
            onClick={handleAccept}
          >
            <Phone className="w-8 h-8" />
          </Button>
        </div>

        {/* Status Text */}
        <p className="text-sm text-muted-foreground animate-fade-in">
          Swipe up to view call details
        </p>
      </div>

      {/* Wave animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-electric opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-accent/20 to-transparent animate-pulse"></div>
      </div>
    </div>
  )
}