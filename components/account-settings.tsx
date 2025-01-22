"use client";

import {
  Button,
  Input,
  Textarea,
  Avatar,
  CardBody,
  Divider,
  Card,
} from "@heroui/react";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import { BiImage } from "react-icons/bi";

function AccountSettings() {
  const [username, setUsername] = useState("current_user");
  const [email, setEmail] = useState("user@example.com");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  const handleUpdateProfile = async () => {
    // TODO: Implement profile update
    console.log("Update profile");
  };

  const handleUpdatePassword = async () => {
    // TODO: Implement password update
    console.log("Update password");
  };

  return (
    <Card classNames={{ base: "p-4" }}>
      <CardBody className="gap-8">
        {/* Profile Picture */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Profile Picture</h2>
          <div className="flex items-center gap-4">
            <Avatar
              src={avatarPreview ?? undefined}
              className="w-24 h-24"
              showFallback
            />
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 flex-1 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-default-300"
              }`}
            >
              <input {...getInputProps()} />
              <BiImage className="w-8 h-8 mx-auto mb-2 text-default-400" />
              <p className="text-default-600">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag and drop an image, or click to select"}
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Profile Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <div className="space-y-4 max-w-xl">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              minRows={3}
              placeholder="Tell us about yourself..."
            />
            <Button color="primary" onPress={handleUpdateProfile}>
              Update Profile
            </Button>
          </div>
        </div>

        <Divider />

        {/* Change Password */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <div className="space-y-4 max-w-xl">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button color="primary" onPress={handleUpdatePassword}>
              Change Password
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default AccountSettings;
