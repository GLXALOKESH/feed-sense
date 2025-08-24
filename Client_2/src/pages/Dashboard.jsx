import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const sentimentData = [
  { sentiment: "Positive", value: 65 },
  { sentiment: "Neutral", value: 20 },
  { sentiment: "Negative", value: 15 },
];

const engagementData = [
  { month: "Jan", engagement: 60 },
  { month: "Feb", engagement: 75 },
  { month: "Mar", engagement: 50 },
  { month: "Apr", engagement: 90 },
];

const customers = [
  { id: 1, name: "John Doe", aiCalled: true, score: 78, discount: true },
  { id: 2, name: "Jane Smith", aiCalled: false, score: 55, discount: false },
  { id: 3, name: "Amit Sharma", aiCalled: true, score: 92, discount: true },
];

export default function ProductManagerDashboard() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleViewAnalysis = (customerId) => {
    navigate(`/customers/${customerId}?productId=${productId}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-scroll max-h-screen">
        <div className="p-8 grid gap-6">
          
          {/* Overall Dashboard */}
          <h1 className="text-2xl font-bold">📊 Overall Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Sentiment Summary */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>Customer Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={sentimentData}>
                    <XAxis dataKey="sentiment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>⚡ 40% complaints about battery → Prioritize optimization</li>
                  <li>📈 High engagement in March → Double down on campaigns</li>
                  <li>💡 Neutral feedback trend rising → Monitor closely</li>
                </ul>
              </CardContent>
            </Card>

            {/* Engagement Trend */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement" stroke="#16a34a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Cards */}
          <h2 className="text-2xl font-bold mt-10">👥 Customer Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
              >
                <Card className="shadow-lg rounded-2xl border hover:shadow-2xl transition">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {c.name}
                      {c.discount && (
                        <Badge variant="secondary" className="bg-yellow-300 text-black">
                          🎉 Discount
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span>Status:</span>
                      {c.aiCalled ? (
                        <Badge className="bg-green-500">AI Called</Badge>
                      ) : (
                        <Badge className="bg-gray-400">Not Called</Badge>
                      )}
                    </div>
                    <div className="mb-2">Participation Score</div>
                    <Progress value={c.score} className="h-2" />
                    <div className="text-sm text-right mt-1">{c.score}/100</div>
                    {c.aiCalled && (
                      <Button
                        className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleViewAnalysis(c.id)}
                      >
                        View Analysis
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
