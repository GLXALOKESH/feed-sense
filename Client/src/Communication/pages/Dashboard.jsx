import { Bot, Calendar, Clock, Eye } from "lucide-react";

// Mock UI components for stand-alone functionality
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Card = ({ children, className }) => <div className={`border rounded-lg shadow-md bg-gray-800 border-gray-700 text-white ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 pb-4 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-400 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const Badge = ({ children, className }) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}>{children}</span>;

// Interface for a single recent call record
interface RecentCall {
  id: number;
  date: string;
  duration: string;
  status: 'completed' | 'missed' | 'active';
  summary: string;
}

// Mock data for recent calls
const recentCalls: RecentCall[] = [
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
];

const Dashboard = (): JSX.Element => {
  const userName: string = "John Doe"; // This would come from auth context

  const getStatusColor = (status: RecentCall['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'missed':
        return 'bg-red-500/20 text-red-400';
      case 'active':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: RecentCall['status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen font-sans text-white">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-gray-400 mt-1">
            Ready for your next AI-powered conversation
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* AI Call Status Card */}
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <CardTitle>AI Assistant Ready</CardTitle>
          <CardDescription>
            Your AI assistant will call you when scheduled or when important updates are available
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto">
            Schedule Call
          </Button>
        </CardContent>
      </Card>

      {/* Recent Call History */}
      <Card>
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
            <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg text-sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCalls.map((call: RecentCall) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium">{call.date}</span>
                      <Badge className={getStatusColor(call.status)}>
                        {getStatusText(call.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Duration: {call.duration}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      {call.summary}
                    </p>
                  </div>
                </div>
                <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg flex items-center gap-2 text-sm flex-shrink-0">
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-400">Total Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">2h 45m</p>
                <p className="text-sm text-gray-400">Total Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
