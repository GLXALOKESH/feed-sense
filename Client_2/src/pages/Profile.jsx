import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { backend_url } from "../constants";

export default function UserProfile() {
  const { productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/users/profile`,
          { withCredentials: true }
        );
        setProfile(res.data.data);
      } catch {
        // handle error
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${backend_url}/api/v1/users/profile`,
        profile,
        { withCredentials: true }
      );
      setProfile(res.data.data);
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-scroll max-h-screen">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h1 className="text-2xl font-semibold">
                {profile.name || "User"}
              </h1>
              <p className="text-gray-500">
                {profile.role && profile.company
                  ? `${profile.role} at ${profile.company}`
                  : ""}
              </p>
            </div>
          </div>

          {/* Profile Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isEditing) handleSave();
                    else setIsEditing(true);
                  }}
                  disabled={loading}
                >
                  {isEditing
                    ? loading
                      ? "Saving..."
                      : "Save"
                    : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <Input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Company</label>
                <Input
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <Input
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Password</label>
                <Input type="password" placeholder="••••••••" disabled />
                <Button variant="outline" className="mt-2" disabled>
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Email Notifications</span>
                <Switch defaultChecked disabled />
              </div>
            </CardContent>
          </Card>

          {/* Subscription Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-gray-500">Limited features</p>
              </div>
              <Button disabled>Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
