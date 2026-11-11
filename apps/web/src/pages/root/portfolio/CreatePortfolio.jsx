import { useRef } from "react";
import { ArrowLeft, Plus, Save, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import SectionHeader from "@/components/form/SectionHeader";
import SkillsInput from "@/components/form/SkillsInput";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const emptyItems = (count) => Array.from({ length: count }, () => ({}));

const CreatePortfolio = () => {
  const photoInputRef = useRef(null);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10 lg:px-18">
      <header className="mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" type="button" className="mb-3 -ml-3">
            <ArrowLeft />
            Back to dashboard
          </Button>
        </Link>
        <p className="text-sm font-medium text-primary">Portfolio builder</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Create your portfolio
        </h1>
        <p className="mt-2 text-muted-foreground">
          Present your work, experience, and skills in one place.
        </p>
      </header>

      <form className="grid gap-6">
        <Card>
          <SectionHeader
            title="Profile information"
            description="Introduce yourself and define your portfolio identity."
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Portfolio title">
                <Input placeholder="e.g. Alex Martin - Frontend Developer" />
              </Field>
              <Field label="Username">
                <Input placeholder="alex-martin" />
              </Field>
              <Field label="First name">
                <Input placeholder="First name" />
              </Field>
              <Field label="Last name">
                <Input placeholder="Last name" />
              </Field>
              <Field label="Headline" className="sm:col-span-2">
                <Input placeholder="Frontend developer crafting useful experiences." />
              </Field>
              <Field label="Email">
                <Input placeholder="you@example.com" type="email" />
              </Field>
              <Field label="Location">
                <Input placeholder="City, Country" />
              </Field>
            </div>
            <Field label="Profile photo">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground ring-1 ring-border">
                  Photo
                </div>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload />
                  Upload photo
                </Button>
              </div>
            </Field>
            <Field label="About me">
              <Textarea className="min-h-32" placeholder="Tell visitors about yourself..." />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Experience"
            description="Show the experience that supports your professional story."
            action={<Button variant="outline" size="sm" type="button"><Plus /> Add experience</Button>}
          />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            {emptyItems(1).map((_, index) => (
              <div key={index} className="grid gap-5 rounded-3xl border border-border p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Experience {index + 1}</h3>
                  <Button variant="ghost" size="icon-sm" type="button" aria-label="Remove experience"><Trash2 /></Button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Position"><Input placeholder="e.g. Senior Frontend Developer" /></Field>
                  <Field label="Company"><Input placeholder="Company name" /></Field>
                  <Field label="Location"><Input placeholder="City, Country or Remote" /></Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Start date"><DatePicker /></Field>
                    <Field label="End date"><DatePicker placeholder="Present" /></Field>
                  </div>
                  <Field label="Description" className="sm:col-span-2"><Textarea placeholder="Describe your responsibilities..." /></Field>
                  <Field label="Achievements" className="sm:col-span-2"><Textarea placeholder="One achievement per line" /></Field>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Projects"
            description="Highlight projects that demonstrate your work."
            action={<Button variant="outline" size="sm" type="button"><Plus /> Add project</Button>}
          />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            {emptyItems(1).map((_, index) => (
              <div key={index} className="relative grid gap-5 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5">
                <Button variant="ghost" size="icon-sm" type="button" className="absolute right-3 top-3" aria-label="Remove project"><Trash2 /></Button>
                <Field label="Project title"><Input placeholder="Project name" /></Field>
                <Field label="Project URL"><Input placeholder="https://" type="url" /></Field>
                <Field label="Repository URL"><Input placeholder="https://github.com/..." type="url" /></Field>
                <Field label="Technologies"><Input placeholder="React, TypeScript, CSS..." /></Field>
                <Field label="Description" className="sm:col-span-2"><Textarea placeholder="Describe your project..." /></Field>
                <Field label="Project image"><Input type="file" accept="image/*" /></Field>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <SectionHeader title="Education" description="Add your academic background." action={<Button variant="outline" size="sm" type="button"><Plus /> Add education</Button>} />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="grid gap-5 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Degree"><Input placeholder="e.g. Master of Computer Science" /></Field>
              <Field label="Institution"><Input placeholder="Institution name" /></Field>
              <Field label="Location"><Input placeholder="City, Country" /></Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Start date"><DatePicker /></Field>
                <Field label="End date"><DatePicker /></Field>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader title="Skills and links" description="Make it easy for visitors to understand and follow your work." />
          <CardContent className="grid gap-6 px-4 pt-5 sm:px-6 sm:pt-6">
            <Field label="Skills">
              <SkillsInput />
              <span className="text-xs font-normal text-muted-foreground">
                Add each skill individually.
              </span>
            </Field>
            <div className="grid gap-4">
              <div className="flex items-center justify-between"><h3 className="text-sm font-medium">Links</h3><Button variant="ghost" size="sm" type="button"><Plus /> Add</Button></div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Field label="Label"><Input placeholder="LinkedIn" /></Field>
                <Field label="URL"><Input placeholder="https://" type="url" /></Field>
              </div>
            </div>
          </CardContent>
        </Card>

        <VisibilitySwitch />
        <div className="flex justify-end gap-2 pb-8">
          <Button type="button"><Save /> Save portfolio</Button>
        </div>
      </form>
    </main>
  );
};

export default CreatePortfolio;
