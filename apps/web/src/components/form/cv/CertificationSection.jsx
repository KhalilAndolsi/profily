import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "../DatePicker";
import Field from "../Field";

const CertificationSection = ({ certifications = [], setCertifications }) => {
  return (
  <section className="grid gap-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">Certifications</h3>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => setCertifications([...certifications, {}])}
      >
        <Plus />
        Add
      </Button>
    </div>
    <div className="grid gap-4">
      {certifications.length === 0 && (
        <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
          No certifications added yet.
        </p>
      )}
      {certifications.map((certification, index) => (
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
            onClick={() =>
              setCertifications(
                certifications.filter((_, itemIndex) => itemIndex !== index),
              )
            }
          >
            <Trash2 />
          </Button>
          <Field
            label={
              <span>
                Certification name <span className="text-destructive">*</span>
              </span>
            }
          >
            <Input
              placeholder="Certification name"
              value={certification.name ?? ""}
              onChange={(event) =>
                setCertifications(
                  certifications.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, name: event.target.value }
                      : item,
                  ),
                )
              }
              required
            />
          </Field>
          <Field
            label={
              <span>
                Issuer <span className="text-destructive">*</span>
              </span>
            }
          >
            <Input
              placeholder="Issuing organization"
              value={certification.issuer ?? ""}
              onChange={(event) =>
                setCertifications(
                  certifications.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, issuer: event.target.value }
                      : item,
                  ),
                )
              }
              required
            />
          </Field>
          <Field label="Date">
            <DatePicker
              value={certification.date}
              onChange={(date) =>
                setCertifications(
                  certifications.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, date: date?.toISOString() ?? "" }
                      : item,
                  ),
                )
              }
            />
          </Field>
        </div>
      ))}
    </div>
  </section>
)
};

export default CertificationSection;
