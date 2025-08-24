import { useState, useEffect } from "react";
import { Upload, UserPlus, FileSpreadsheet, CheckCircle, XCircle, Edit, Trash, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { backend_url } from "../constants";

export default function ContactManagement() {
  const { productId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [csvUploading, setCsvUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [manualLoading, setManualLoading] = useState(false);

  // Fetch all contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.post(`${backend_url}/api/v1/contacts`,{}, { withCredentials: true });
        setContacts(res.data.data || []);
      } catch {
        setContacts([]);
      }
    };
    fetchContacts();
  }, []);

  // CSV upload handler
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCsvUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/contacts/upload-csv`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Refresh contacts after upload
      setContacts((prev) => [...prev, ...(res.data.data || [])]);
      alert("Contacts uploaded successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to upload contacts"
      );
    } finally {
      setCsvUploading(false);
    }
  };

  // Delete contact handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await axios.delete(`${backend_url}/api/v1/contacts/${id}`,{}, { withCredentials: true });
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to delete contact"
      );
    }
  };

  // Start editing a contact
  const startEdit = (contact) => {
    setEditingId(contact._id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      role: contact.role,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
    });
  };

  // Save edited contact
  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `${backend_url}/api/v1/contacts/${id}`,
        editForm,
        { withCredentials: true }
      );
      setContacts(
        contacts.map((c) =>
          c._id === id ? { ...c, ...res.data.data } : c
        )
      );
      cancelEdit();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to update contact"
      );
    }
  };

  // Manual add handler
  const handleManualChange = (e) => {
    setManualForm({ ...manualForm, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setManualLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/contacts`,
        manualForm,
        
        { withCredentials: true }
      );
      setContacts((prev) => [...prev, res.data.data]);
      setManualForm({ name: "", email: "", phone: "", company: "", role: "" });
      alert("Contact added successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to add contact"
      );
    } finally {
      setManualLoading(false);
    }
  };

  // Handler for AI call
  const handleAICall = async (contactId) => {
    try {
      // Replace with your backend API endpoint for triggering AI call
      await axios.post(
        `${backend_url}/api/v1/ai/call`,
        { contactId },
        { withCredentials: true }
      );
      alert("AI call initiated for this contact!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to initiate AI call"
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-scroll max-h-screen">
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
              <input
                type="file"
                accept=".csv"
                className="mt-4"
                onChange={handleCSVUpload}
                disabled={csvUploading}
              />
              {csvUploading && <div className="text-blue-500 mt-2">Uploading...</div>}
            </Card>
          </TabsContent>

          {/* Manual Entry */}
          <TabsContent value="manual">
            <Card>
              <CardHeader><CardTitle>Add Contact Manually</CardTitle></CardHeader>
              <CardContent>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleManualSubmit}>
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={manualForm.name}
                    onChange={handleManualChange}
                    required
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    value={manualForm.email}
                    onChange={handleManualChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={manualForm.phone}
                    onChange={handleManualChange}
                  />
                  <Input
                    name="company"
                    placeholder="Company"
                    value={manualForm.company}
                    onChange={handleManualChange}
                  />
                  <Input
                    name="role"
                    placeholder="Role"
                    value={manualForm.role}
                    onChange={handleManualChange}
                  />
                  <div className="col-span-2 flex justify-end">
                    <Button type="submit" disabled={manualLoading}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {manualLoading ? "Saving..." : "Save Contact"}
                    </Button>
                  </div>
                </form>
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
                  <TableRow key={c._id}>
                    <TableCell>
                      {editingId === c._id ? (
                        <Input
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        c.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === c._id ? (
                        <Input
                          value={editForm.email}
                          onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      ) : (
                        c.email
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === c._id ? (
                        <Input
                          value={editForm.phone}
                          onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      ) : (
                        c.phone
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === c._id ? (
                        <Input
                          value={editForm.company}
                          onChange={e => setEditForm({ ...editForm, company: e.target.value })}
                        />
                      ) : (
                        c.company
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === c._id ? (
                        <Input
                          value={editForm.role}
                          onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                        />
                      ) : (
                        c.role
                      )}
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      {c.status === "Active" ? (
                        <CheckCircle className="text-green-500 h-4 w-4" />
                      ) : (
                        <XCircle className="text-yellow-500 h-4 w-4" />
                      )}
                      <span>{c.status || "Active"}</span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      {editingId === c._id ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => saveEdit(c._id)}>Save</Button>
                          <Button variant="destructive" size="sm" onClick={cancelEdit}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" onClick={() => startEdit(c)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(c._id)}><Trash className="h-4 w-4" /></Button>
                          <Button variant="secondary" size="sm" onClick={() => handleAICall(c._id)}>
                            <Phone className="h-4 w-4 mr-1" /> Call
                          </Button>
                        </>
                      )}
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
