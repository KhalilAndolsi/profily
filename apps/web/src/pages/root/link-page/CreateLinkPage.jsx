import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import Field from "@/components/form/Field";
import SectionHeader from "@/components/form/SectionHeader";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const requiredLabel = (label) => (
  <span>
    {label} <span className="text-destructive">*</span>
  </span>
);

const CreateLinkPage = ({ forEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const photoInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [links, setLinks] = useState([{}]);
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(forEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!forEdit || !id) return;

    const loadLinkPage = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/link-page/me/${id}`);
        const linkPage = response.data.linkPage;
        const ownerId =
          typeof linkPage.owner === "object"
            ? linkPage.owner._id
            : linkPage.owner;
        if (!user || String(ownerId) !== String(user.id)) {
          setError("You do not have access to edit this links page.");
          return;
        }

        setTitle(linkPage.title ?? "");
        setUsername(linkPage.username ?? "");
        setFirstName(linkPage.firstName ?? "");
        setLastName(linkPage.lastName ?? "");
        setBio(linkPage.bio ?? "");
        setLinks(linkPage.links ?? []);
        setIsPublic(linkPage.isPublic ?? true);
        setExistingPhoto(
          linkPage.photo?.startsWith("/uploads/")
            ? `http://localhost:3000${linkPage.photo}`
            : (linkPage.photo ?? ""),
        );
      } catch (requestError) {
        setError(
          requestError.response?.status === 404
            ? "You do not have access to edit this links page."
            : requestError.response?.data?.message ||
                "Could not load this links page.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadLinkPage();
  }, [forEdit, id, user]);

  const updateLink = (index, field, value) => {
    setLinks((current) =>
      current.map((link, itemIndex) =>
        itemIndex === index ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!photo && !existingPhoto) {
      setError("Profile photo is required.");
      return;
    }
    const hasIncompleteLink = links.some(
      (link) => !link.label?.trim() || !link.url?.trim(),
    );
    if (links.length === 0 || hasIncompleteLink) {
      setError("Add at least one complete link.");
      return;
    }
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    formData.append("isPublic", String(isPublic));
    formData.append("links", JSON.stringify(links));
    if (photo) formData.append("photo", photo);

    try {
      if (forEdit && id) await api.patch(`/link-page/${id}`, formData);
      else await api.post("/link-page/create", formData);
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not save the links page.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-72 rounded-3xl" />
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-10 lg:px-18">
      <header className="mb-8">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="mb-3 -ml-3"
          >
            <ArrowLeft />
            Back to dashboard
          </Button>
        </Link>
        <p className="text-sm font-medium text-primary">Links page builder</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {forEdit ? "Edit your links page" : "Create your links page"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Share your profile and important links from one simple page.
        </p>
      </header>

      <form className="grid gap-6" onSubmit={handleSave}>
        <Card>
          <SectionHeader
            title="Profile information"
            description="Set up the profile visitors will see."
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={requiredLabel("First name")}>
                <Input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="First name"
                  required
                />
              </Field>
              <Field label={requiredLabel("Last name")}>
                <Input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Last name"
                  required
                />
              </Field>
              <Field
                label={requiredLabel("Page title")}
                className="sm:col-span-2"
              >
                <Input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Alex Martin - Links"
                  required
                />
              </Field>
              <Field label={requiredLabel("Username")}>
                <Input
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="alex-martin"
                  pattern="[a-z0-9-]+"
                  title="Use lowercase letters, numbers, and hyphens"
                  required
                />
              </Field>
            </div>
            <Field label={requiredLabel("Profile photo")}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted text-xs text-muted-foreground ring-1 ring-border">
                  {(photo || existingPhoto) && (
                    <img
                      src={photo ? URL.createObjectURL(photo) : existingPhoto}
                      alt="Profile"
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) =>
                    setPhoto(event.target.files?.[0] ?? null)
                  }
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload /> Upload photo
                </Button>
              </div>
            </Field>
            <Field label={requiredLabel("Bio")}>
              <Textarea
                className="min-h-28"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Write a short bio..."
                required
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Links"
            description="Add the websites and profiles you want to share."
            action={
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setLinks([...links, {}])}
              >
                <Plus /> Add link
              </Button>
            }
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            {links.map((link, index) => (
              <div
                key={link._id ?? index}
                className="relative grid gap-5 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
              >
                <Button
                  variant="ghost"
                  size="icon-sm"
                  type="button"
                  className="absolute right-3 top-3"
                  aria-label="Remove link"
                  onClick={() =>
                    setLinks(
                      links.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <Trash2 />
                </Button>
                <Field label={requiredLabel("Link label")}>
                  <Input
                    value={link.label ?? ""}
                    onChange={(event) =>
                      updateLink(index, "label", event.target.value)
                    }
                    placeholder="e.g. LinkedIn"
                    required
                  />
                </Field>
                <Field label={requiredLabel("URL")}>
                  <Input
                    value={link.url ?? ""}
                    onChange={(event) =>
                      updateLink(index, "url", event.target.value)
                    }
                    placeholder="https://"
                    type="url"
                    required
                  />
                </Field>
              </div>
            ))}
            {links.length === 0 && (
              <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                No links added yet.
              </p>
            )}
          </CardContent>
        </Card>

        <VisibilitySwitch isPublic={isPublic} onChange={setIsPublic} />
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle />
            <AlertTitle>
              {forEdit ? "Access denied" : "Links page error"}
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-end gap-2 pb-8">
          <Button type="submit" disabled={saving}>
            <Save />{" "}
            {saving
              ? "Saving..."
              : forEdit
                ? "Update links page"
                : "Save links page"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateLinkPage;
