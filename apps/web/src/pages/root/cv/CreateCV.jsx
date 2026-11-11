import React, { useRef } from "react";
import { ArrowLeft, Plus, Save, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

import AdditionalSection from "@/components/form/cv/AdditionalSection";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import LanguageInput from "@/components/form/cv/LanguageInput";
import SectionHeader from "@/components/form/SectionHeader";
import SkillsInput from "@/components/form/SkillsInput";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const emptyItems = (count) => Array.from({ length: count }, () => ({}));

const CreateCV = ({ forEdit = false }) => {
  const photoInputRef = useRef(null);
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
            Create your CV
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add your details and build a CV that represents your experience.
          </p>
        </div>
      </header>

      <form className="grid gap-6">
        <Card>
          <SectionHeader
            title="Basic information"
            description="The essentials people need to know about you."
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="CV title">
                <Input placeholder="e.g. Frontend Developer CV" />
              </Field>
              <Field label="Professional website">
                <Input placeholder="https://" type="url" />
              </Field>
              <Field label="First name">
                <Input placeholder="First name" />
              </Field>
              <Field label="Last name">
                <Input placeholder="Last name" />
              </Field>
              <Field label="Email">
                <Input placeholder="you@example.com" type="email" />
              </Field>
              <Field label="Phone">
                <Input placeholder="+1 555 000 0000" type="tel" />
              </Field>
              <Field label="Location" className="sm:col-span-2">
                <Input placeholder="City, Country" />
              </Field>
            </div>
            <Field label="Profile photo">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-xs text-muted-foreground ring-1 ring-border">
                  Photo
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  aria-label="Upload profile photo"
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
            <Field label="Professional summary">
              <Textarea
                className="min-h-32"
                placeholder="Write a short introduction about yourself..."
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Work experience"
            description="Showcase your professional experience, from most recent to oldest."
            action={
              <Button variant="outline" size="sm" type="button">
                <Plus />
                Add experience
              </Button>
            }
          />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            {emptyItems(1).map((_, index) => (
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
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Position">
                    <Input placeholder="e.g. Senior Product Designer" />
                  </Field>
                  <Field label="Company">
                    <Input placeholder="Company name" />
                  </Field>
                  <Field label="Location">
                    <Input placeholder="City, Country or Remote" />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Start date">
                      <DatePicker />
                    </Field>
                    <Field label="End date">
                      <DatePicker placeholder="Present" />
                    </Field>
                  </div>
                  <Field label="Description" className="sm:col-span-2">
                    <Textarea placeholder="Describe your responsibilities..." />
                  </Field>
                  <Field label="Achievements" className="sm:col-span-2">
                    <Textarea
                      className="min-h-28"
                      placeholder="One achievement per line"
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
          <SectionHeader
            title="Education"
            description="Add your academic background and qualifications."
            action={
              <Button variant="outline" size="sm" type="button">
                <Plus />
                Add education
              </Button>
            }
          />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            {emptyItems(1).map((_, index) => (
              <div
                key={index}
                className="grid gap-5 rounded-3xl border border-border p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">Education {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    aria-label="Remove education"
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Degree">
                    <Input placeholder="e.g. Master of Computer Science" />
                  </Field>
                  <Field label="Institution">
                    <Input placeholder="Institution name" />
                  </Field>
                  <Field label="Location">
                    <Input placeholder="City, Country" />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Start date">
                      <DatePicker />
                    </Field>
                    <Field label="End date">
                      <DatePicker />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Skills & languages"
            description="Highlight your key skills and language proficiency."
          />
          <CardContent className="grid min-w-0 items-start gap-6 px-4 pt-5 sm:grid-cols-2 sm:px-6 sm:pt-6">
            <Field label="Skills" className="min-w-0">
              <SkillsInput />
              <span className="text-xs font-normal text-muted-foreground">
                Add each skill individually.
              </span>
            </Field>
            <LanguageInput />
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Additional sections"
            description="Give recruiters more context about your work and achievements."
          />
          <CardContent className="grid gap-8 px-4 pt-5 sm:px-6 sm:pt-6">
            <AdditionalSection />
          </CardContent>
        </Card>

        <VisibilitySwitch />
        <div className="flex justify-end gap-2 pb-8">
          <Button type="button">
            <Save />
            Save CV
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateCV;
