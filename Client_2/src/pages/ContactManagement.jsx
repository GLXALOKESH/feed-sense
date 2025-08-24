import { useState } from "react";
import { Upload, UserPlus, FileSpreadsheet, CheckCircle, XCircle, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function ContactManagement() {
  const { productId } = useParams();
  const [contacts, setContacts] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@company.com", phone: "9876543210", company: "Acme Inc", role: "Manager", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@startup.io", phone: "9123456789", company: "StartupX", role: "Engineer", status: "Imported" },
  ]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contact Management</h1>
          <Button><UserPlus className="mr-2 h-4 w-4" /> Add New</Button>
        </div>

        {/* Tabs for Adding Contacts */}
        <Tabs defaultValue="csv" className="space-y-4">
          <TabsList>
            <TabsTrigger value="csv" className="flex items-center"><FileSpreadsheet className="mr-2 h-4 w-4" /> Upload via CSV</TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center"><UserPlus className="mr-2 h-4 w-4" /> Add Contact Manually</TabsTrigger>
          </TabsList>

          {/* CSV Upload */}
          <TabsContent value="csv">
            <Card className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-500 cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-500" />
              <p className="mt-2 text-sm text-gray-600">Drag & drop your CSV file here, or click to browse.</p>
              <p className="text-xs text-gray-400 mt-1">File must be in .csv format with Name, Email, Phone, Company, Role columns.</p>
            </Card>
          </TabsContent>

          {/* Manual Entry */}
          <TabsContent value="manual">
            <Card>
              <CardHeader><CardTitle>Add Contact Manually</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Company" />
                <Input placeholder="Role" />
                <div className="col-span-2 flex justify-end">
                  <Button><UserPlus className="mr-2 h-4 w-4" /> Save Contact</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact List */}
        <Card>
          <CardHeader><CardTitle>Contact List</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.company}</TableCell>
                    <TableCell>{c.role}</TableCell>
                    <TableCell className="flex items-center space-x-2">
                      {c.status === "Active" ? (
                        <CheckCircle className="text-green-500 h-4 w-4" />
                      ) : (
                        <XCircle className="text-yellow-500 h-4 w-4" />
                      )}
                      <span>{c.status}</span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="sm"><Trash className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
