import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import DatePicker from "../DatePicker";
import Field from "../Field";

const emptyItems = (count) => Array.from({ length: count }, () => ({}));

const AdditionalSection = () => (
  <>
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Projects</h3>
        <Button variant="ghost" size="sm" type="button">
          <Plus />
          Add
        </Button>
      </div>
      <div className="grid gap-4">
        {emptyItems(1).map((_, index) => (
          <div
            key={`project-${index}`}
            className="relative grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
          >
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              className="absolute right-3 top-3"
              aria-label="Remove project"
            >
              <Trash2 />
            </Button>
            <Field label="Project name">
              <Input placeholder="Project name" />
            </Field>
            <Field label="Project URL">
              <Input placeholder="Project URL" type="url" />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <Textarea placeholder="Describe your project..." />
            </Field>
            <Field label="Technologies" className="sm:col-span-2">
              <Input placeholder="React, TypeScript, Node.js..." />
            </Field>
          </div>
        ))}
      </div>
    </section>

    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Certifications</h3>
        <Button variant="ghost" size="sm" type="button">
          <Plus />
          Add
        </Button>
      </div>
      <div className="grid gap-4">
        {emptyItems(1).map((_, index) => (
          <div
            key={`certification-${index}`}
            className="relative grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
          >
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              className="absolute right-3 top-3"
              aria-label="Remove certification"
            >
              <Trash2 />
            </Button>
            <Field label="Certification name">
              <Input placeholder="Certification name" />
            </Field>
            <Field label="Issuer">
              <Input placeholder="Issuing organization" />
            </Field>
            <Field label="Date">
              <DatePicker />
            </Field>
          </div>
        ))}
      </div>
    </section>

    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Links</h3>
        <Button variant="ghost" size="sm" type="button">
          <Plus />
          Add
        </Button>
      </div>
      <div className="grid gap-4">
        {emptyItems(1).map((_, index) => (
          <div
            key={`link-${index}`}
            className="relative grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 sm:p-5"
          >
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              className="absolute right-3 top-3"
              aria-label="Remove link"
            >
              <Trash2 />
            </Button>
            <Field label="Link label">
              <Input placeholder="e.g. LinkedIn" />
            </Field>
            <Field label="URL">
              <Input placeholder="https://" type="url" />
            </Field>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default AdditionalSection;
