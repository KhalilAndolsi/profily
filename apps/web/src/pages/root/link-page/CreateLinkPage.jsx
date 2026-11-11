import { useRef } from "react";
import { ArrowLeft, Plus, Save, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Field from "@/components/form/Field";
import SectionHeader from "@/components/form/SectionHeader";
import VisibilitySwitch from "@/components/form/VisibilitySwitch";

const CreateLinkPage = () => {
  const photoInputRef = useRef(null);

  return (
    <main className="container mx-auto max-w-3xl px-4 py-6 sm:px-8 sm:py-10 lg:px-18">
      <header className="mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" type="button" className="mb-3 -ml-3">
            <ArrowLeft />
            Back to dashboard
          </Button>
        </Link>
        <p className="text-sm font-medium text-primary">Links page builder</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Create your links page
        </h1>
        <p className="mt-2 text-muted-foreground">
          Share your profile and important links from one simple page.
        </p>
      </header>

      <form className="grid gap-6">
        <Card>
          <SectionHeader title="Profile information" description="Set up the profile visitors will see." />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name"><Input placeholder="First name" /></Field>
              <Field label="Last name"><Input placeholder="Last name" /></Field>
              <Field label="Page title" className="sm:col-span-2"><Input placeholder="e.g. Alex Martin - Links" /></Field>
              <Field label="Email"><Input placeholder="you@example.com" type="email" /></Field>
              <Field label="Username"><Input placeholder="alex-martin" /></Field>
            </div>
            <Field label="Profile photo">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground ring-1 ring-border">Photo</div>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" />
                <Button variant="outline" type="button" onClick={() => photoInputRef.current?.click()}><Upload /> Upload photo</Button>
              </div>
            </Field>
            <Field label="Bio"><Textarea className="min-h-28" placeholder="Write a short bio..." /></Field>
          </CardContent>
        </Card>

        <Card>
          <SectionHeader
            title="Links"
            description="Add the websites and profiles you want to share."
            action={<Button variant="outline" size="sm" type="button"><Plus /> Add link</Button>}
          />
          <CardContent className="grid gap-5 px-4 pt-5 sm:px-6 sm:pt-6">
            {[{}].map((_, index) => (
              <div key={index} className="relative grid gap-5 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5">
                <Button variant="ghost" size="icon-sm" type="button" className="absolute right-3 top-3" aria-label="Remove link"><Trash2 /></Button>
                <Field label="Link label"><Input placeholder="e.g. LinkedIn" /></Field>
                <Field label="URL"><Input placeholder="https://" type="url" /></Field>
              </div>
            ))}
          </CardContent>
        </Card>

        <VisibilitySwitch />
        <div className="flex justify-end gap-2 pb-8">
          <Button type="button"><Save /> Save links page</Button>
        </div>
      </form>
    </main>
  );
};

export default CreateLinkPage;
