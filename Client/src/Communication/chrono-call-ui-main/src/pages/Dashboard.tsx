import { Bot, Calendar, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for recent calls
const recentCalls = [
  {
    id: 1,
    date: "2024-01-15",
    duration: "5:32",
    status: "completed",
    summary: "Discussed project updates and next steps"
  },
  {
    id: 2,
    date: "2024-01-14",
    duration: "3:45",
    status: "completed",
    summary: "Review of quarterly reports"
  },
  {
    id: 3,
    date: "2024-01-13",
    duration: "0:00",
    status: "missed",
    summary: "Missed call - no summary available"
  }
]

const Dashboard = () => {
  const userName = "John Doe" // This would come from auth context

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'missed':
        return 'status-missed'
      case 'active':
        return 'status-active'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'missed':
        return 'Missed'
      case 'active':
        return 'Active'
      default:
        return status
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground mt-1">
            Ready for your next AI-powered conversation
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center glow-accent">
          <Bot className="w-6 h-6 text-accent-foreground" />
        </div>
      </div>

      {/* AI Call Status Card */}
      <Card className="gradient-card">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-electric flex items-center justify-center glow-accent">
            <Bot className="w-10 h-10 text-accent-foreground" />
          </div>
          <CardTitle className="text-2xl">AI Assistant Ready</CardTitle>
          <CardDescription>
            Your AI assistant will call you when scheduled or when important updates are available
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button variant="electric" size="lg" className="w-full sm:w-auto">
            Schedule Call
          </Button>
        </CardContent>
      </Card>

      {/* Recent Call History */}
      <Card className="gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Call History
              </CardTitle>
              <CardDescription>
                Your latest AI assistant conversations
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalls.map((call) => (
              <div 
                key={call.id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{call.date}</span>
                      <Badge variant="outline" className={getStatusColor(call.status)}>
                        {getStatusText(call.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Duration: {call.duration}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {call.summary}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Transcript
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">2h 45m</p>
                <p className="text-sm text-muted-foreground">Total Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard