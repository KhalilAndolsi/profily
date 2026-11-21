import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Mail,
  Monitor,
  Moon,
  RefreshCw,
  Sun,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/providers/theme-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/components/providers/auth-provider";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUser, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    setNickname(user?.nickname ?? "");
    setAvatar(user?.avatar ?? "");
  }, [user]);

  const removePageType = async (label, endpoint) => {
    try {
      await api.delete(endpoint);
      setMessage(`All ${label} have been removed.`);
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || `Could not remove ${label}.`);
    }
  };

  const clearAllData = async () => {
    try {
      await Promise.all([
        api.delete("/cv/me"),
        api.delete("/portfolio/me"),
        api.delete("/link-page/me"),
      ]);
      setMessage("All pages and saved data have been deleted.");
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || "Could not delete all data.");
    }
  };

  const removeAccount = async () => {
    try {
      await api.delete("/auth/account");
      signOut();
      navigate("/");
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || "Could not remove the account.");
    }
  };

  const generateRandomAvatar = () => {
    setAvatar(`https://api.dicebear.com/10.x/lorelei/svg?seed=${Math.random()}`);
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    setMessage("");
    try {
      const response = await api.patch("/auth/me", { nickname, avatar });
      updateUser({ ...user, ...response.data.user });
      setMessage("Profile updated successfully.");
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || "Could not update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const openDeleteDialog = (title, description, action) => {
    setPendingAction({ title, description, action });
  };

  const confirmDelete = () => {
    pendingAction?.action();
    setPendingAction(null);
  };

  return (
    <main className="container mx-auto min-h-[70vh] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account information and saved pages.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar size="lg" className="size-24">
              <AvatarImage
                src={user.avatar}
                alt={`${user.nickname}'s avatar`}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{user.nickname}</h2>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                {user.email}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} />
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              These actions permanently remove data from this browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <section className="space-y-4 border-b pb-6">
              <div>
                <h2 className="font-semibold">Edit profile</h2>
                <p className="text-sm text-muted-foreground">
                  Update your display name and avatar.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Avatar size="lg" className="size-20">
                  <AvatarImage
                    src={avatar}
                    alt={`${nickname || "User"}'s avatar`}
                  />
                  <AvatarFallback>
                    {nickname ? nickname.slice(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" onClick={generateRandomAvatar}>
                  <RefreshCw />
                  Generate random avatar
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-name">Display name</Label>
                <Input id="display-name" value={nickname} onChange={(event) => setNickname(event.target.value)} minLength={2} maxLength={50} />
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => {
                  setNickname(user?.nickname ?? "");
                  setAvatar(user?.avatar ?? "");
                }}>
                  Cancel
                </Button>
                <Button type="button" onClick={saveProfile} disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Save"}
                </Button>
              </div>
            </section>
            <section className="space-y-4">
              <div>
                <h2 className="font-semibold">Appearance</h2>
                <p className="text-sm text-muted-foreground">
                  Choose how Profily looks on your device.
                </p>
              </div>
              <div
                role="tablist"
                aria-label="Theme"
                className="grid gap-3 sm:grid-cols-3"
              >
                {[
                  { value: "system", label: "System", icon: Monitor },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "light", label: "Light", icon: Sun },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    role="tab"
                    aria-selected={theme === value}
                    variant={theme === value ? "default" : "outline"}
                    onClick={() => setTheme(value)}
                  >
                    <Icon />
                    {label}
                  </Button>
                ))}
              </div>
            </section>
            <div className="border-t pt-4">
              <h2 className="font-semibold">Manage account</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 isolate transform-gpu">
              <Button
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(
                    "Remove all CVs?",
                    "This will permanently remove all of your CVs.",
                    () => removePageType("CVs", "/cv/me"),
                  )
                }
              >
                <Trash2 />
                Remove CVs
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(
                    "Remove all portfolios?",
                    "This will permanently remove all of your portfolios.",
                    () => removePageType("portfolios", "/portfolio/me"),
                  )
                }
              >
                <Trash2 />
                Remove portfolios
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(
                    "Remove all links pages?",
                    "This will permanently remove all of your links pages.",
                    () => removePageType("links pages", "/link-page/me"),
                  )
                }
              >
                <Trash2 />
                Remove links pages
              </Button>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-destructive/20 p-4 sm:flex-row sm:items-center sm:justify-between isolate transform-gpu">
              <div>
                <h2 className="font-semibold">Delete all data</h2>
                <p className="text-sm text-muted-foreground">
                  Delete all of your CVs, portfolios, and links pages.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(
                    "Delete all data?",
                    "This will permanently remove all of your pages and saved data.",
                    clearAllData,
                  )
                }
              >
                <Trash2 />
                Delete all data
              </Button>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-destructive/20 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">Remove account</h2>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() =>
                  openDeleteDialog(
                    "Remove account?",
                    "This will permanently delete your account and all CVs, portfolios, and links pages.",
                    removeAccount,
                  )
                }
              >
                <AlertTriangle />
                Remove account
              </Button>
            </div>
            {message && (
              <p role="status" className="text-sm text-muted-foreground">
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingAction(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Confirm delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Profile;
