import { useState } from "react"
import { Bot, Eye, Download, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for call history
const callHistory = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:30",
    duration: "5:32",
    status: "completed",
    summary: "Discussed project updates and quarterly goals. Reviewed timeline for upcoming deliverables.",
    transcript: "Available"
  },
  {
    id: 2,
    date: "2024-01-14",
    time: "09:15",
    duration: "3:45",
    status: "completed",
    summary: "Review of quarterly reports and performance metrics discussion.",
    transcript: "Available"
  },
  {
    id: 3,
    date: "2024-01-13",
    time: "16:45",
    duration: "0:00",
    status: "missed",
    summary: "Missed call - AI assistant attempted to reach regarding urgent updates.",
    transcript: "Not available"
  },
  {
    id: 4,
    date: "2024-01-12",
    time: "11:20",
    duration: "7:18",
    status: "completed",
    summary: "Strategic planning session for Q2 initiatives and resource allocation.",
    transcript: "Available"
  },
  {
    id: 5,
    date: "2024-01-11",
    time: "13:00",
    duration: "4:22",
    status: "completed",
    summary: "Weekly check-in and progress update on current projects.",
    transcript: "Available"
  },
  {
    id: 6,
    date: "2024-01-10",
    time: "10:30",
    duration: "0:00",
    status: "missed",
    summary: "Missed call - follow-up regarding previous meeting action items.",
    transcript: "Not available"
  }
]

const CallHistory = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredCalls = callHistory.filter(call => {
    const matchesStatus = filterStatus === "all" || call.status === filterStatus
    const matchesSearch = call.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.date.includes(searchTerm)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Call History</h1>
          <p className="text-muted-foreground mt-1">
            View all your AI assistant conversations and transcripts
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Filters */}
      <Card className="gradient-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search calls by date or summary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Call History List */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Call History ({filteredCalls.length})
          </CardTitle>
          <CardDescription>
            Detailed history of all AI assistant interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCalls.map((call) => (
              <div 
                key={call.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{call.date}</span>
                      <span className="text-sm text-muted-foreground">{call.time}</span>
                      <Badge variant="outline" className={getStatusColor(call.status)}>
                        {getStatusText(call.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Duration: {call.duration}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {call.summary}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {call.transcript === "Available" && (
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Transcript
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCalls.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No calls found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CallHistory