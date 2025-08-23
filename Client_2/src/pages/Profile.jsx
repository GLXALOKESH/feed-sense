import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-semibold">Alex Johnson</h1>
            <p className="text-gray-500">Product Manager at Acme Inc.</p>
          </div>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile Information</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <Input defaultValue="Alex Johnson" disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <Input
                defaultValue="alex.johnson@email.com"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Company</label>
              <Input defaultValue="Acme Inc." disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <Input defaultValue="Product Manager" disabled={!isEditing} />
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
              <Button variant="outline" className="mt-2">
                Change Password
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Email Notifications</span>
              <Switch defaultChecked />
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
            <Button>Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
