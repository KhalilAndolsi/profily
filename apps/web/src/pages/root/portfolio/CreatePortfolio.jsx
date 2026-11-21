import React, { useEffect, useRef, useState } from "react";
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
import SkillsInput from "@/components/form/SkillsInput";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const requiredLabel = (label) => (
  <span>
    {label} <span className="text-destructive">*</span>
  </span>
);

const CreatePortfolio = ({ forEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const photoInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [links, setLinks] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(forEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!forEdit || !id) return;

    const loadPortfolio = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/portfolio/me/${id}`);
        const portfolio = response.data.portfolio;
        const ownerId =
          typeof portfolio.owner === "object"
            ? portfolio.owner._id
            : portfolio.owner;
        if (!user || String(ownerId) !== String(user.id)) {
          setError("You do not have access to edit this portfolio.");
          return;
        }

        setTitle(portfolio.title ?? "");
        setUsername(portfolio.username ?? "");
        setFirstName(portfolio.firstName ?? "");
        setLastName(portfolio.lastName ?? "");
        setHeadline(portfolio.headline ?? "");
        setEmail(portfolio.email ?? "");
        setLocation(portfolio.location ?? "");
        setBio(portfolio.bio ?? "");
        setExperience(portfolio.experience ?? []);
        setProjects(portfolio.projects ?? []);
        setEducation(portfolio.education ?? []);
        setSkills(portfolio.skills ?? []);
        setLinks(portfolio.links ?? []);
        setIsPublic(portfolio.isPublic ?? true);
        setExistingPhoto(
          portfolio.photo?.startsWith("/uploads/")
            ? `http://localhost:3000${portfolio.photo}`
            : (portfolio.photo ?? ""),
        );
      } catch (requestError) {
        setError(
          requestError.response?.status === 404
            ? "You do not have access to edit this portfolio."
            : requestError.response?.data?.message ||
                "Could not load this portfolio.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [forEdit, id, user]);

  const updateArrayItem = (setter, items, index, field, value) => {
    setter(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!photo && !existingPhoto) {
      setError("Profile photo is required.");
      return;
    }
    setSaving(true);
    setError("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("headline", headline);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("bio", bio);
    formData.append("isPublic", String(isPublic));
    formData.append("experience", JSON.stringify(experience));
    formData.append("projects", JSON.stringify(projects));
    formData.append("education", JSON.stringify(education));
    formData.append("skills", JSON.stringify(skills));
    formData.append("links", JSON.stringify(links));
    if (photo) formData.append("photo", photo);
    projectImages.forEach((file) => {
      if (file) formData.append("projectImages", file);
    });

    try {
      if (forEdit && id) await api.patch(`/portfolio/${id}`, formData);
      else await api.post("/portfolio/create", formData);
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not save the portfolio.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Skeleton className="h-72 rounded-3xl" />
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10 lg:px-18">
      <header className="mb-8">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="mb-3 -ml-3"
          >
            <ArrowLeft /> Back to dashboard
          </Button>
        </Link>
        <p className="text-sm font-medium text-primary">Portfolio builder</p>
        <h1 className="mt-1 text-3xl font-semibold">
          {forEdit ? "Edit your portfolio" : "Create your portfolio"}
        </h1>
      </header>

      <form className="grid gap-6" onSubmit={handleSave}>
        <Card>
          <SectionHeader
            title="Profile information"
            description="Introduce yourself and define your portfolio identity."
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={requiredLabel("Portfolio title")}>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Field>
              <Field label={requiredLabel("Username")}>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Field>
              <Field label={requiredLabel("First name")}>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Field>
              <Field label={requiredLabel("Last name")}>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Field>
              <Field
                label={requiredLabel("Headline")}
                className="sm:col-span-2"
              >
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                />
              </Field>
              <Field label={requiredLabel("Email")}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field label={requiredLabel("Location")}>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Field>
            </div>
            <Field label={requiredLabel("Profile photo")}>
              <div className="flex items-center gap-4">
                <div className="size-16 overflow-hidden rounded-full bg-muted ring-1 ring-border">
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
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload /> Upload photo
                </Button>
              </div>
            </Field>
            <Field label={requiredLabel("About me")}>
              <Textarea
                className="min-h-32"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Experience"
            description="Show the experience that supports your story."
            action={
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setExperience([...experience, {}])}
              >
                <Plus /> Add experience
              </Button>
            }
          />
          <CardContent className="grid gap-6 px-4 pt-5">
            {experience.length === 0 && (
              <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                No experience added yet.
              </p>
            )}
            {experience.map((item, index) => (
              <div
                key={index}
                className="grid gap-5 rounded-3xl border p-4 sm:p-5"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">Experience {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setExperience(experience.filter((_, i) => i !== index))
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={requiredLabel("Position")}>
                    <Input
                      value={item.position ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setExperience,
                          experience,
                          index,
                          "position",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </Field>
                  <Field label={requiredLabel("Company")}>
                    <Input
                      value={item.company ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setExperience,
                          experience,
                          index,
                          "company",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </Field>
                  <Field label="Location">
                    <Input
                      value={item.location ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setExperience,
                          experience,
                          index,
                          "location",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <Field label="Description" className="sm:col-span-2">
                    <Textarea
                      value={item.description ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setExperience,
                          experience,
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Projects"
            description="Highlight projects that demonstrate your work."
            action={
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => {
                  setProjects([...projects, {}]);
                  setProjectImages([...projectImages, null]);
                }}
              >
                <Plus /> Add project
              </Button>
            }
          />
          <CardContent className="grid gap-6 px-4 pt-5">
            {projects.length === 0 && (
              <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                No projects added yet.
              </p>
            )}
            {projects.map((item, index) => (
              <div
                key={index}
                className="relative grid gap-5 rounded-3xl border p-4 sm:grid-cols-2 sm:p-5"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-3 top-3"
                  onClick={() => {
                    setProjects(projects.filter((_, i) => i !== index));
                    setProjectImages(
                      projectImages.filter((_, i) => i !== index),
                    );
                  }}
                >
                  <Trash2 />
                </Button>
                <Field label={requiredLabel("Project title")}>
                  <Input
                    value={item.title ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setProjects,
                        projects,
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                    required
                  />
                </Field>
                <Field label="Project URL">
                  <Input
                    type="url"
                    value={item.url ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setProjects,
                        projects,
                        index,
                        "url",
                        e.target.value,
                      )
                    }
                  />
                </Field>
                <Field label="Repository URL">
                  <Input
                    type="url"
                    value={item.repository ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setProjects,
                        projects,
                        index,
                        "repository",
                        e.target.value,
                      )
                    }
                  />
                </Field>
                <Field label="Technologies">
                  <Input
                    value={(item.technologies ?? []).join(", ")}
                    onChange={(e) =>
                      updateArrayItem(
                        setProjects,
                        projects,
                        index,
                        "technologies",
                        e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <Textarea
                    value={item.description ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setProjects,
                        projects,
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </Field>
                <Field label="Project image" className="sm:col-span-2">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) =>
                      setProjectImages(
                        projectImages.map((file, i) =>
                          i === index ? (e.target.files?.[0] ?? null) : file,
                        ),
                      )
                    }
                  />
                </Field>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Education"
            description="Add your academic background."
            action={
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setEducation([...education, {}])}
              >
                <Plus /> Add education
              </Button>
            }
          />
          <CardContent className="grid gap-6 px-4 pt-5">
            {education.length === 0 && (
              <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                No education added yet.
              </p>
            )}
            {education.map((item, index) => (
              <div
                key={index}
                className="grid gap-5 rounded-3xl border p-4 sm:grid-cols-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute"
                  aria-label="Remove education"
                  onClick={() =>
                    setEducation(education.filter((_, i) => i !== index))
                  }
                >
                  <Trash2 />
                </Button>
                <Field label={requiredLabel("Degree")}>
                  <Input
                    value={item.degree ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setEducation,
                        education,
                        index,
                        "degree",
                        e.target.value,
                      )
                    }
                    required
                  />
                </Field>
                <Field label={requiredLabel("Institution")}>
                  <Input
                    value={item.institution ?? ""}
                    onChange={(e) =>
                      updateArrayItem(
                        setEducation,
                        education,
                        index,
                        "institution",
                        e.target.value,
                      )
                    }
                    required
                  />
                </Field>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Skills and links"
            description="Make it easy for visitors to understand and follow your work."
          />
          <CardContent className="grid gap-6 px-4 pt-5">
            <Field label="Skills">
              <SkillsInput skills={skills} onChange={setSkills} />
            </Field>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Links</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setLinks([...links, {}])}
                >
                  <Plus /> Add
                </Button>
              </div>
              {links.map((item, index) => (
                <div key={index} className="grid gap-4 lg:grid-cols-2">
                  <Field label={requiredLabel("Label")}>
                    <Input
                      value={item.label ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setLinks,
                          links,
                          index,
                          "label",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </Field>
                  <Field label={requiredLabel("URL")}>
                    <Input
                      type="url"
                      value={item.url ?? ""}
                      onChange={(e) =>
                        updateArrayItem(
                          setLinks,
                          links,
                          index,
                          "url",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </Field>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <VisibilitySwitch isPublic={isPublic} onChange={setIsPublic} />
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle />
            <AlertTitle>
              {forEdit ? "Access denied" : "Portfolio error"}
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-end pb-8">
          <Button type="submit" disabled={saving}>
            <Save />{" "}
            {saving
              ? "Saving..."
              : forEdit
                ? "Update portfolio"
                : "Save portfolio"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreatePortfolio;
