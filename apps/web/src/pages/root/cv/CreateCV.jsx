import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import ProjectSection from "@/components/form/cv/ProjectSection";
import CertificationSection from "@/components/form/cv/CertificationSection";
import LinkSection from "@/components/form/cv/LinkSection";
import EducationSection from "@/components/form/cv/EducationSection";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import LanguageInput from "@/components/form/cv/LanguageInput";
import SectionHeader from "@/components/form/SectionHeader";
import SkillsInput from "@/components/form/SkillsInput";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const CreateCV = ({ forEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const photoInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [links, setLinks] = useState([]);
  const [template, setTemplate] = useState("classic");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(forEdit);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    if (!forEdit || !id) return;

    const loadCv = async () => {
      setLoading(true);
      setAccessError("");

      try {
        const response = await api.get(`/cv/me/${id}`);
        const cv = response.data.cv;
        const ownerId = typeof cv.owner === "object" ? cv.owner._id : cv.owner;

        if (!user || String(ownerId) !== String(user.id)) {
          setAccessError("You do not have access to edit this CV.");
          return;
        }

        setTitle(cv.title ?? "");
        setWebsite(cv.website ?? "");
        setFirstName(cv.firstName ?? "");
        setLastName(cv.lastName ?? "");
        setEmail(cv.email ?? "");
        setPhone(cv.phone ?? "");
        setLocation(cv.location ?? "");
        setExistingPhoto(
          cv.photo?.startsWith("/uploads/")
            ? `http://localhost:3000${cv.photo}`
            : (cv.photo ?? ""),
        );
        setSummary(cv.summary ?? "");
        setExperience(cv.experience ?? []);
        setEducation(cv.education ?? []);
        setSkills(cv.skills ?? []);
        setLanguages(
          (cv.languages ?? []).map((language, index) => ({
            ...language,
            id: language._id ?? language.id ?? index + 1,
          })),
        );
        setProjects(cv.projects ?? []);
        setCertifications(cv.certifications ?? []);
        setLinks(cv.links ?? []);
        setTemplate(cv.template ?? "classic");
        setIsPublic(cv.isPublic ?? true);
      } catch (requestError) {
        setAccessError(
          requestError.response?.status === 404
            ? "You do not have access to edit this CV."
            : requestError.response?.data?.message || "Could not load this CV.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCv();
  }, [forEdit, id, user]);

  const updateExperience = (index, field, value) => {
    setExperience((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("website", website);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("summary", summary);
    formData.append("template", template);
    formData.append("isPublic", String(isPublic));
    formData.append("experience", JSON.stringify(experience));
    formData.append("education", JSON.stringify(education));
    formData.append("skills", JSON.stringify(skills));
    formData.append("languages", JSON.stringify(languages));
    formData.append("projects", JSON.stringify(projects));
    formData.append("certifications", JSON.stringify(certifications));
    formData.append("links", JSON.stringify(links));
    if (photo) formData.append("photo", photo);

    try {
      if (forEdit && id) {
        await api.patch(`/cv/${id}`, formData);
      } else {
        await api.post("/cv/create", formData);
      }
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not save the CV.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="container mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10 lg:px-18">
      <header className="mb-8">
        <div>
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
          <p className="text-sm font-medium text-primary">CV builder</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            {forEdit ? "Edit your CV" : "Create your CV"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add your details and build a CV that represents your experience.
          </p>
        </div>
      </header>

      {accessError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle />
          <AlertTitle>Access denied</AlertTitle>
          <AlertDescription>{accessError}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <div className="grid gap-6">
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
          <Skeleton className="h-72 rounded-3xl" />
        </div>
      ) : !accessError ? (
        <form className="grid gap-6" onSubmit={handleSave}>
          <Card>
            <SectionHeader
              title="Basic information"
              description="The essentials people need to know about you."
            />
            <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={
                    <span>
                      CV title <span className="text-destructive">*</span>
                    </span>
                  }
                >
                  <Input
                    placeholder="e.g. Frontend Developer CV"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </Field>
                <Field label="Professional website">
                  <Input
                    placeholder="https://"
                    type="url"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </Field>
                <Field
                  label={
                    <span>
                      First name <span className="text-destructive">*</span>
                    </span>
                  }
                >
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </Field>
                <Field
                  label={
                    <span>
                      Last name <span className="text-destructive">*</span>
                    </span>
                  }
                >
                  <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </Field>
                <Field
                  label={
                    <span>
                      Email <span className="text-destructive">*</span>
                    </span>
                  }
                >
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Field>
                <Field
                  label={
                    <span>
                      Phone <span className="text-destructive">*</span>
                    </span>
                  }
                >
                  <Input
                    placeholder="+1 555 000 0000"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </Field>
                <Field
                  label={
                    <span>
                      Location <span className="text-destructive">*</span>
                    </span>
                  }
                  className="sm:col-span-2"
                >
                  <Input
                    placeholder="City, Country"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    required
                  />
                </Field>
              </div>
              <Field label="Profile photo">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-xs text-muted-foreground ring-1 ring-border">
                    {photo ? (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Profile preview"
                        className="size-full rounded-2xl object-cover"
                      />
                    ) : existingPhoto ? (
                      <img
                        src={existingPhoto}
                        alt="Profile preview"
                        className="size-full rounded-2xl object-cover"
                      />
                    ) : (
                      "Photo"
                    )}
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    aria-label="Upload profile photo"
                    onChange={(event) =>
                      setPhoto(event.target.files?.[0] ?? null)
                    }
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                  >
                    <Upload />
                    Upload photo
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    JPG or PNG, up to 5 MB
                  </span>
                </div>
              </Field>
              <Field
                label={
                  <span>
                    Professional summary{" "}
                    <span className="text-destructive">*</span>
                  </span>
                }
              >
                <Textarea
                  className="min-h-32"
                  placeholder="Write a short introduction about yourself..."
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  required
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <SectionHeader
              title="Work experience"
              description="Showcase your professional experience, from most recent to oldest."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setExperience((current) => [...current, {}])}
                >
                  <Plus />
                  Add experience
                </Button>
              }
            />
            <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
              {experience.length === 0 && (
                <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                  No experience added yet.
                </p>
              )}
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-5 rounded-3xl border border-border p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Experience {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      type="button"
                      aria-label="Remove experience"
                      onClick={() =>
                        setExperience((current) =>
                          current.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label={
                        <span>
                          Position <span className="text-destructive">*</span>
                        </span>
                      }
                    >
                      <Input
                        placeholder="e.g. Senior Product Designer"
                        value={item.position ?? ""}
                        onChange={(event) =>
                          updateExperience(
                            index,
                            "position",
                            event.target.value,
                          )
                        }
                        required
                      />
                    </Field>
                    <Field
                      label={
                        <span>
                          Company <span className="text-destructive">*</span>
                        </span>
                      }
                    >
                      <Input
                        placeholder="Company name"
                        value={item.company ?? ""}
                        onChange={(event) =>
                          updateExperience(index, "company", event.target.value)
                        }
                        required
                      />
                    </Field>
                    <Field label="Location">
                      <Input
                        placeholder="City, Country or Remote"
                        value={item.location ?? ""}
                        onChange={(event) =>
                          updateExperience(
                            index,
                            "location",
                            event.target.value,
                          )
                        }
                      />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Start date">
                        <DatePicker
                          value={item.startDate}
                          onChange={(date) =>
                            updateExperience(
                              index,
                              "startDate",
                              date ? date.toISOString().slice(0, 10) : "",
                            )
                          }
                        />
                      </Field>
                      <Field label="End date">
                        <DatePicker
                          placeholder="Present"
                          value={item.endDate}
                          onChange={(date) =>
                            updateExperience(
                              index,
                              "endDate",
                              date ? date.toISOString().slice(0, 10) : "",
                            )
                          }
                        />
                      </Field>
                    </div>
                    <Field label="Description" className="sm:col-span-2">
                      <Textarea
                        placeholder="Describe your responsibilities..."
                        value={item.description ?? ""}
                        onChange={(event) =>
                          updateExperience(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Achievements" className="sm:col-span-2">
                      <Textarea
                        className="min-h-28"
                        placeholder="One achievement per line"
                        value={(item.achievements ?? []).join("\n")}
                        onChange={(event) =>
                          updateExperience(
                            index,
                            "achievements",
                            event.target.value.split("\n").filter(Boolean),
                          )
                        }
                      />
                      <span className="text-xs font-normal text-muted-foreground">
                        Add one achievement per line.
                      </span>
                    </Field>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <EducationSection
              education={education}
              setEducation={setEducation}
            />
          </Card>

          <Card>
            <SectionHeader
              title="Skills & languages"
              description="Highlight your key skills and language proficiency."
            />
            <CardContent className="grid min-w-0 items-start gap-6 px-4 pt-5 sm:grid-cols-2 sm:px-6 sm:pt-6">
              <Field label="Skills" className="min-w-0">
                <SkillsInput skills={skills} onChange={setSkills} />
                <span className="text-xs font-normal text-muted-foreground">
                  Add each skill individually.
                </span>
              </Field>
              <LanguageInput languages={languages} onChange={setLanguages} />
            </CardContent>
          </Card>

          <Card>
            <SectionHeader
              title="Additional sections"
              description="Give recruiters more context about your work and achievements."
            />
            <CardContent className="grid gap-8 px-4 pt-5 sm:px-6 sm:pt-6">
              <ProjectSection projects={projects} setProjects={setProjects} />
              <CertificationSection
                certifications={certifications}
                setCertifications={setCertifications}
              />
              <LinkSection links={links} setLinks={setLinks} />
            </CardContent>
          </Card>

          <VisibilitySwitch isPublic={isPublic} onChange={setIsPublic} />
          <div className="flex justify-end gap-2 pb-8">
            {error && (
              <p role="alert" className="mr-auto text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" disabled={saving}>
              <Save />
              {saving ? "Saving..." : forEdit ? "Update CV" : "Save CV"}
            </Button>
          </div>
        </form>
      ) : null}
    </main>
  );
};

export default CreateCV;
