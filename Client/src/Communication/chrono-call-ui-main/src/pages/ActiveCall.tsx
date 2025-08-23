import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Mic, MicOff, PhoneOff } from "lucide-react"

interface TranscriptMessage {
  id: string
  speaker: 'ai' | 'user'
  text: string
  timestamp: string
}

export default function ActiveCall() {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
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
  ])

  // Simulate call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate AI speaking animation
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      setIsAISpeaking(prev => !prev)
    }, 2000)

    return () => clearInterval(speakingInterval)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    navigate('/call/summary')
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen gradient-card flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full gradient-electric blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 text-center border-b border-border/20">
        <p className="text-sm text-muted-foreground">Call Duration</p>
        <p className="text-2xl font-bold gradient-text">{formatDuration(callDuration)}</p>
      </div>

      {/* AI Avatar Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-8 space-y-6">
        <div className={`relative transition-all duration-300 ${isAISpeaking ? 'scale-110' : 'scale-100'}`}>
          <Avatar className={`w-40 h-40 transition-all duration-300 ${isAISpeaking ? 'glow-accent' : 'glow-primary'}`}>
            <AvatarFallback className="gradient-electric text-6xl">
              <Bot className="w-20 h-20 text-accent-foreground" />
            </AvatarFallback>
          </Avatar>
          
          {/* Speaking indicator */}
          {isAISpeaking && (
            <div className="absolute inset-0 rounded-full border-4 border-accent/50 animate-ping"></div>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">AI Assistant</h2>
          <p className="text-muted-foreground">
            {isAISpeaking ? 'Speaking...' : 'Listening...'}
          </p>
        </div>
      </div>

      {/* Live Transcript */}
      <div className="relative z-10 flex-1 mx-6 mb-6">
        <div className="gradient-card rounded-lg p-4 h-full">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Live Transcript</h3>
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {transcript.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.speaker === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="relative z-10 p-6 flex justify-center items-center gap-8">
        {/* Mute Button */}
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="icon"
          className="w-14 h-14 rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        {/* End Call Button */}
        <Button
          variant="endCall"
          size="icon"
          className="w-16 h-16 rounded-full"
          onClick={handleEndCall}
        >
          <PhoneOff className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}