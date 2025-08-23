import { useState } from "react";
import { Bot, Eye, Download, Filter, Calendar } from "lucide-react";

// Mock UI components for stand-alone functionality
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Card = ({ children, className }) => <div className={`border rounded-lg shadow-md bg-gray-800 border-gray-700 ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 pb-0 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-xl font-bold text-white ${className}`}>{children}</h2>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const Badge = ({ children, className }) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>;
const Input = (props) => <input {...props} className={`w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${props.className}`} />;
const Select = ({ children, value, onValueChange }) => <div className="relative">{children}</div>; // Simplified mock
const SelectTrigger = ({ children }) => <div className="p-2 border rounded-md border-gray-600 bg-gray-700 text-white flex items-center justify-between">{children}</div>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children }) => <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">{children}</div>; // Simplified mock
const SelectItem = ({ children, value }) => <div className="p-2 hover:bg-gray-600 cursor-pointer">{children}</div>; // Simplified mock

// Interface for a single call record
interface Call {
  id: number;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'missed';
  summary: string;
  transcript: 'Available' | 'Not available';
}

// Mock data for call history
const callHistory: Call[] = [
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
];

const CallHistory = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getStatusColor = (status: Call['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'missed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: Call['status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredCalls = callHistory.filter((call: Call) => {
    const matchesStatus = filterStatus === "all" || call.status === filterStatus;
    const matchesSearch = call.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.date.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Call History</h1>
          <p className="text-gray-400 mt-1">
            View all your AI assistant conversations and transcripts
          </p>
        </div>
        <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search calls by date or summary..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* This is a simplified mock; a real implementation would handle state differently */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
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
      <Card>
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
            {filteredCalls.map((call: Call) => (
              <div
                key={call.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className="font-medium">{call.date}</span>
                      <span className="text-sm text-gray-400">{call.time}</span>
                      <Badge className={getStatusColor(call.status)}>
                        {getStatusText(call.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      Duration: {call.duration}
                    </p>
                    <p className="text-sm text-gray-300">
                      {call.summary}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                  {call.transcript === "Available" && (
                    <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  )}
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCalls.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-500">No calls found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CallHistory;
