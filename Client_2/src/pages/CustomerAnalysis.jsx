import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserCircle, CheckCircle, XCircle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function CustomerDetail() {
  const { productId } = useParams();
  const [couponReceived] = useState(true);

  // Dummy data for charts
  const data = [
    { name: "Jan", sentiment: 70, engagement: 60 },
    { name: "Feb", sentiment: 80, engagement: 75 },
    { name: "Mar", sentiment: 65, engagement: 50 },
  ];

  // Dummy conversation logs
  const logs = [
    { time: "2025-08-01 10:22", msg: "Asked about refund", notes: "Customer frustrated" },
    { time: "2025-08-03 14:12", msg: "Accepted discount coupon", notes: "Sentiment improved" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <UserCircle size={40} className="text-gray-700" />
            <h1 className="text-2xl font-semibold">John Doe</h1>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
            ${couponReceived ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {couponReceived ? <CheckCircle size={16}/> : <XCircle size={16}/>}
            {couponReceived ? "Coupon Received" : "No Coupon"}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="border-b mb-4">
            <TabsTrigger value="analysis">Analysis Data</TabsTrigger>
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
          </TabsList>

          {/* Analysis Data */}
          <TabsContent value="analysis">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sentiment Trend */}
              <Card className="shadow-md rounded-2xl hover:scale-[1.01] transition">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-3">Sentiment Trend</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sentiment" stroke="#3b82f6" strokeWidth={2}/>
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Engagement Trend */}
              <Card className="shadow-md rounded-2xl hover:scale-[1.01] transition">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-3">Engagement Trend</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="engagement" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Raw Data */}
          <TabsContent value="raw">
            <Card className="shadow-md rounded-2xl">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-3">Conversation Logs</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-2">Timestamp</th>
                        <th className="p-2">Message</th>
                        <th className="p-2">AI Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-2">{log.time}</td>
                          <td className="p-2">{log.msg}</td>
                          <td className="p-2">{log.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
